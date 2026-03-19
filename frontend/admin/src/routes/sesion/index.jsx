import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Flex, Image, Layout, Row, Spin, Tag, Typography } from "antd";
import { CHECKOUTS } from "constants/demoData";
import { CANCEL } from "constants/index";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClientClaims } from "services/helpers";
import { formatCurrency, formatDate, formatQuantity } from "utils";
import Carrito from "./components/Carrito";
import Chat from "./components/Chat";
import { disconnectSocket, initiateSocket, subscribeToChat, subscribeToChatHistory } from "./components/Chat/useSocket";
import CrearSesion from "./components/CrearSesion";
import SolicitarUnirse from "./components/SolicitarUnirse";
import "./components/styles.css";
import useGetSesion from "./useGetSesion";
import usePedidos from "./usePedidos";

const { Text } = Typography;
const { Content } = Layout;

const Sesion = () => {
  const navigate = useNavigate();
  const storedClient = getClientClaims();
  const { sesion, loadingSesion, code, descriptionCode, fetchSesion } = useGetSesion();
  const { pedidos, fetchPedidos } = usePedidos();
  const [openCrearSesion, setOpenCrearSesion] = useState(false);
  const [openSolicitar, setOpenSolicitar] = useState(false);
  const [openCarrito, setOpenCarrito] = useState(false);
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  const totalPropio = pedidos?.reduce((acc, pedido) => {
    if (storedClient?.dni === pedido?.cliente?.dni) {
      acc += pedido?.items?.reduce(
        (itemAcc, item) => itemAcc + item.subtotal,
        0,
      );
    }
    return acc;
  }, 0);

  const totalGrupal = pedidos?.reduce(
    (acc, pedido) => acc + (pedido?.total || 0),
    0,
  );

  const totalItems = pedidos?.reduce((acc, pedido) => {
    acc += pedido?.items?.reduce(
      (itemAcc, item) => itemAcc + (item?.cantidad || 0),
      0,
    );
    return acc;
  }, 0);

  useEffect(() => {
    if (!code) return;
    if (code === CHECKOUTS.TABLE_AVAILABLE) setOpenCrearSesion(true);
    if (code === CHECKOUTS.TABLE_OCCUPIED) setOpenSolicitar(true);
  }, [code]);

  useEffect(() => {
    if (!sesion?.id) return;

    fetchPedidos(sesion.id);
    initiateSocket(sesion.id);

    subscribeToChatHistory((err, msgs) => {
      if (!err) setMessages(msgs);
    });

    subscribeToChat((err, msg) => {
      if (!err) setMessages((prev) => [...prev, msg]);
    });

    return () => disconnectSocket();
  }, [sesion?.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [pedidos, messages]);

  const onClose = (e) => {
    setOpenSolicitar(false);
    setOpenCrearSesion(false);
    if (e === CANCEL) {
      navigate(-1);
    } else {
      fetchSesion();
    }
  }

  // Dentro del componente, reemplazá los dos .map() separados por esto:

  // 1. Primero construís el timeline unificado
  const timeline = useMemo(() => {
    const items = [];

    pedidos?.forEach((pedido) => {
      pedido?.items?.forEach((item) => {
        items.push({
          type: "pedido",
          time: pedido.created_at,
          isMine: storedClient?.dni === pedido?.cliente?.dni,
          pedido,
          item,
        });
      });
    });

    messages?.forEach((msg) => {
      items.push({
        type: "mensaje",
        time: msg.time,
        isMine: storedClient?.dni === msg.sender?.dni,
        msg,
      });
    });

    return items.sort((a, b) => new Date(a.time) - new Date(b.time));
  }, [pedidos, messages]);

  return (
    <Spin
      tip="Cargando mesa..."
      spinning={loadingSesion}
    >
      {code === CHECKOUTS.ALREADY_IN_SESSION &&
        <Flex
          vertical
          style={{
            height: "100vh",
            maxWidth: 1000,
            margin: "0 auto",
            background: "#202C33",
          }}
        >
          <Flex
            vertical
            style={{ padding: 16 }}
          >
            <Flex
              justify="space-between"
              align="center"
              wrap
              style={{ gap: 12 }}
            >
              <Flex vertical>
                <Text strong>
                  Pedidos en grupo
                </Text>
                <Text type="secondary">
                  {formatQuantity(totalItems)} items en el pedido
                </Text>
              </Flex>

              <Flex gap={16}>
                <Flex
                  vertical
                  align="end"
                >
                  <Text type="secondary">Mis gastos</Text>
                  <Text strong>
                    {formatCurrency(totalPropio)}
                  </Text>
                </Flex>

                <Divider
                  vertical
                  style={{ height: 'auto' }}
                />

                <Flex
                  vertical
                  align="end"
                >
                  <Text type="secondary">Total grupal</Text>
                  <Text strong>
                    {formatCurrency(totalGrupal)}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          
          <Content
            className="fondo-pedidos-grupal"
            style={{ padding: "8px 16px", overflowY: "auto" }}
          >
            {timeline.map((entry, index) => {
              const { isMine } = entry;
              const prevEntry = timeline[index - 1];

              if (entry.type === "pedido") {
                const { pedido, item } = entry;
                const showName = prevEntry?.pedido?.cliente?.dni !== pedido?.cliente?.dni
                  || prevEntry?.type !== "pedido";

                return (
                  <div
                    key={`pedido-${item.id}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: isMine ? "end" : "start",
                      marginTop: showName ? 12 : 4,
                      width: "100%",
                    }}
                  >
                    {showName && (
                      <Text
                        style={{
                          fontSize: 11,
                          color: pedido?.cliente?.color || "#aaa",
                          marginBottom: 2,
                          marginLeft: isMine ? 0 : 8,
                          marginRight: isMine ? 8 : 0,
                        }}
                      >
                        {pedido?.cliente?.nombre} {pedido?.cliente?.apellido}
                      </Text>
                    )}

                    <div
                      style={{
                        position: "relative",
                        padding: 8,
                        paddingBottom: 28,
                        borderRadius: 12,
                        color: "#FFF",
                        background: isMine ? "#005C4B" : "#2A3942",
                        maxWidth: 320,
                        width: "100%",
                      }}
                      className={isMine ? "bubble-right" : "bubble-left"}
                    >
                      <Row gutter={8} wrap={false}>
                        <Col>
                          <Image
                            src={item.producto?.img_url}
                            alt={item.producto?.nombre}
                            width={64}
                            height={64}
                            style={{ objectFit: "cover", borderRadius: 10 }}
                            preview={false}
                          />
                        </Col>
                        <Col flex="1">
                          <Text strong style={{ display: "block", fontSize: 13 }}>
                            {item.producto?.nombre}
                          </Text>
                          <Text style={{ fontSize: 11, color: "#aaa" }}>
                            {item.producto?.descripcion}
                          </Text>
                          <div style={{ marginTop: 4 }}>
                            <Tag
                              style={{ fontSize: 10, padding: "0 6px" }}
                              color={
                                pedido.estado?.descripcion === "Pendiente" ? "default"
                                : pedido.estado?.descripcion === "Entregado" ? "green"
                                : pedido.estado?.descripcion === "En preparación" ? "gold"
                                : "red"
                              }
                            >
                              {pedido.estado?.descripcion}
                              {pedido?.delivered_at && ` · ${formatDate(pedido.delivered_at, "HH:mm")}`}
                            </Tag>
                          </div>
                        </Col>
                      </Row>

                      {/* Footer de la burbuja */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 6,
                          left: 10,
                          right: 10,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontSize: 11, color: "#aaa", fontWeight: "bold" }}>
                          x{item.cantidad} · {formatCurrency(item.subtotal)}
                        </Text>
                        <Text style={{ fontSize: 10, color: "#aaa" }}>
                          {formatDate(pedido.created_at, "HH:mm")}
                        </Text>
                      </div>
                    </div>
                  </div>
                );
              }

              // type === "mensaje"
              const { msg } = entry;
              const showName = prevEntry?.msg?.sender?.dni !== msg.sender?.dni
                || prevEntry?.type !== "mensaje";

              return (
                <div
                  key={`msg-${index}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isMine ? "flex-end" : "flex-start",
                    marginTop: showName ? 12 : 2,
                  }}
                >
                  {showName && !isMine && (
                    <Text
                      style={{
                        fontSize: 11,
                        color: msg.sender?.color || "#aaa",
                        marginBottom: 2,
                        marginLeft: 8,
                      }}
                    >
                      {msg.sender?.nombre}
                    </Text>
                  )}

                  <div
                    style={{
                      background: isMine ? "#005C4B" : "#2A3942",
                      padding: "6px 10px 18px",
                      borderRadius: 10,
                      color: "#FFF",
                      maxWidth: 320,
                      position: "relative",
                      minWidth: 80,
                    }}
                    className={isMine ? "bubble-right" : "bubble-left"}
                  >
                    <div style={{ fontSize: 13, wordBreak: "break-word" }}>
                      {msg.text}
                    </div>
                    <Text
                      style={{
                        position: "absolute",
                        bottom: 4,
                        right: 8,
                        fontSize: 10,
                        color: "#aaa",
                      }}
                    >
                      {formatDate(msg.time, "HH:mm")}
                    </Text>
                  </div>
                </div>
              );
            })}

            <div ref={bottomRef} />
          </Content>

          <Flex
            justify="space-between"
            align="center"
            gap={16}
            style={{
              padding: 12,
              background: "#202C33",
            }}
          >
            <Button
              type="primary"
              shape="circle"
              icon={<ShoppingCartOutlined />}
              onClick={() => setOpenCarrito(true)}
            />

            <Chat
              room={sesion?.id}
              sender={{
                dni: storedClient?.dni,
                nombre: storedClient?.name,
                color: storedClient?.color,
              }}
            />
          </Flex>
          
          {openCarrito &&
            <Carrito
              dni={storedClient?.dni}
              sesionID={sesion?.id}
              onClose={() => {
                setOpenCarrito(false);
                fetchPedidos(sesion?.id);
              }}
            />
          }
        </Flex>
      }

      {openCrearSesion &&
        <CrearSesion
          title={descriptionCode}
          onClose={onClose}
        />
      }

      {openSolicitar &&
        <SolicitarUnirse
          title={descriptionCode}
          onClose={onClose}
        />
      }
    </Spin>
  );
};

export default Sesion;
