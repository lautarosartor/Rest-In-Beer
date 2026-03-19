import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Image, Layout, Row, Tag, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { getClientClaims } from "services/helpers";
import { formatDate } from "utils";
import Chat from "./components/Chat";
import { disconnectSocket, initiateSocket, subscribeToChat, subscribeToChatHistory } from "./components/Chat/useSocket";
import "./components/styles.css";
import usePedidos from "./usePedidos";

const { Text } = Typography;
const { Content } = Layout;

const Sesion = ({ sesion }) => {
  const storedClient = getClientClaims();
  const { pedidos, fetchPedidos } = usePedidos();
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

  return (
    <Layout
      style={{
        height: "100vh",
        maxWidth: 1000,
        margin: "0 auto",
        background: "#202C33",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: 16 }}>
        <Row justify="space-between" wrap>
          <Text strong style={{ color: "#E6EAEC" }}>
            Pedidos en grupo
          </Text>
          <Text style={{ color: "#AEBAC1" }}>
            Total ${new Intl.NumberFormat("es-ES").format(totalGrupal)}
          </Text>
        </Row>

        <Text type="secondary" style={{ color: "#8696A0", fontSize: 12 }}>
          Mis gastos:{" "}
          <strong>${new Intl.NumberFormat("es-ES").format(totalPropio)}</strong>
          , {totalItems} items en el pedido
        </Text>
      </div>
      
      <Content
        className="fondo-pedidos-grupal"
        style={{ padding: 16, overflowY: "auto" }}
      >
        {pedidos?.map((pedido, index) => (
          <React.Fragment key={index}>
            {pedido?.items?.map((item) => {
              const isMine = storedClient?.dni === pedido?.cliente?.dni;

              return (
                <div key={item.id} style={{ margin: 8 }}>
                  <div
                    style={{
                      position: "relative",
                      padding: 8,
                      borderRadius: 12,
                      color: "#FFF",
                      background: isMine ? "#005C4B" : "#202C33",
                      maxWidth: 500,
                      marginLeft: isMine ? "auto" : 0,
                    }}
                    className={isMine ? "bubble-right" : "bubble-left"}
                  >
                    <Row gutter={8}>
                      <Col>
                        <Image
                          src={item.producto?.img_url}
                          alt={item.producto?.nombre}
                          width={80}
                          height={80}
                          style={{
                            objectFit: "cover",
                            borderRadius: 12,
                          }}
                          preview={false}
                        />
                      </Col>

                      <Col flex="1">
                        <Text style={{ fontSize: 12 }}>
                          {pedido?.cliente?.nombre} {pedido?.cliente?.apellido}
                        </Text>

                        <Text strong>{item.producto?.nombre}</Text>

                        <div style={{ fontSize: 11 }}>
                          {item.producto?.descripcion}
                        </div>
                      </Col>
                    </Row>
                    <Tag
                      style={{ marginTop: 8 }}
                      color={
                        pedido.estado?.descripcion === "Pendiente"
                          ? "default"
                          : pedido.estado?.descripcion === "Entregado"
                            ? "green"
                            : pedido.estado?.descripcion === "En preparación"
                              ? "gold"
                              : "red"
                      }
                    >
                      {pedido.estado?.descripcion}
                      {pedido?.delivered_at &&
                        ` - ${formatDate(pedido.delivered_at, "HH:mm")}`}
                    </Tag>
                    <Text
                      style={{
                        position: "absolute",
                        bottom: 4,
                        left: 8,
                        fontSize: 11,
                        fontWeight: "bold",
                      }}
                    >
                      x{item.cantidad}
                    </Text>

                    <Text
                      style={{
                        position: "absolute",
                        bottom: 4,
                        right: 8,
                        fontSize: 11,
                        color: "#ccc",
                      }}
                    >
                      {formatDate(pedido.created_at, "HH:mm")}
                    </Text>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
        {messages.map((msg, index) => {
          const isMine = storedClient?.dni === msg.sender?.dni;
          const showName = msg.sender?.dni !== messages[index - 1]?.sender?.dni;

          return (
            <div
              key={index}
              style={{
                marginTop: showName ? 8 : 4,
                maxWidth: 500,
                marginLeft: isMine ? "auto" : 0,
                background: isMine ? "#005C4B" : "#202C33",
                padding: "6px 8px",
                borderRadius: 8,
                color: "#FFF",
              }}
            >
              {showName && (
                <Text
                  strong
                  style={{
                    color: msg.sender?.color || "#ccc",
                    fontSize: 12,
                  }}
                >
                  {msg.sender?.nombre}
                </Text>
              )}

              <div>{msg.text}</div>

              <Text
                style={{
                  fontSize: 11,
                  color: "#ccc",
                  float: "right",
                }}
              >
                {formatDate(msg.time, "HH:mm")}
              </Text>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </Content>
      <div
        style={{
          padding: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#202C33",
        }}
      >
        <Button
          shape="circle"
          type="primary"
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
      </div>
      {/* {openCarrito && (
        <Carrito
          dni={storedDNI}
          sesionID={sesion?.id}
          closeDrawer={() => {
            setOpenCarrito(false);
            fetchPedidos(sesion?.id);
          }}
        />
      )} */}
    </Layout>
  );
};

export default Sesion;
