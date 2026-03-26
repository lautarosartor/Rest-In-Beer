import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Drawer,
  Empty,
  Flex,
  Grid,
  Image,
  Space,
  Spin,
  Typography
} from "antd";
import emptyShoppingCart from "assets/emptyShoppingCart.png";
import SearchProductosCarrito from "components/AutoCompletes/Productos/SearchProductosCarrito";
import React from "react";
import { formatCurrency } from "utils";
import usePedidos from "./usePedidos";

const { Text } = Typography;
const { useBreakpoint } = Grid;

const Carrito = ({ sesionID, onClose }) => {
  const screens = useBreakpoint();
  const isMobile = !screens.sm;
  const {
    loading,
    productosCarrito,
    cantidad,
    handleAgregarProducto,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    handlePedir,
  } = usePedidos(onClose, sesionID);

  return (
    <Drawer
      title="Productos"
      open={true}
      onClose={onClose}
      size={isMobile ? "100%" : 400}
      placement={isMobile ? "bottom" : "right"}
      loading={loading}
      mask={{ closable: false }}
      footer={
        <Space style={{ width: "100%", justifyContent: "flex-end" }}>
          <Button
            danger
            onClick={onClose}
          >
            Cerrar
          </Button>
          <Button
            type="primary"
            loading={loading}
            onClick={handlePedir}
          >
            Pedir
          </Button>
        </Space>
      }
    >
      <Space
        orientation="vertical"
        style={{ width: "100%" }}
      >
        <SearchProductosCarrito
          agregados={cantidad}
          onSelect={handleAgregarProducto}
          onDeselect={eliminarProducto}
        />

          {productosCarrito?.length ? (
            <Spin
              spinning={loading}
              description="Realizando pedido..."
            >
              {productosCarrito?.map((item, index) => (
                <React.Fragment key={item.id}>
                  <Flex
                    gap={10}
                    align="center"
                  >
                    <Image
                      src={item.img_url}
                      alt={item.nombre}
                      width={52}
                      height={52}
                      preview={false}
                      style={{
                        objectFit: "cover",
                        borderRadius: 8,
                        flexShrink: 0,
                      }}
                    />

                    <Flex
                      vertical
                      style={{ flex: 1 }}
                    >
                      <Text strong style={{ fontSize: 12 }}>
                        {item.nombre}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        {item.descripcion}
                      </Text>
                      <Text strong style={{ fontSize: 12, color: "#009C63" }}>
                        {formatCurrency(item.precio)}
                      </Text>
                    </Flex>

                    <Flex vertical align="center" gap={4}>
                      <Space.Compact>
                        <Button
                          size="small"
                          icon={<MinusOutlined style={{ fontSize: 10 }} />}
                          onClick={() => disminuirCantidad(item.id)}
                        />
                        <Button size="small" disabled style={{ cursor: "default", width: 28 }}>
                          {cantidad[item.id]}
                        </Button>
                        <Button
                          size="small"
                          icon={<PlusOutlined style={{ fontSize: 10 }} />}
                          onClick={() => aumentarCantidad(item.id)}
                        />
                      </Space.Compact>

                      <Button
                        size="small"
                        danger
                        type="text"
                        icon={<DeleteOutlined style={{ fontSize: 11 }} />}
                        onClick={() => eliminarProducto(item.id)}
                      />
                    </Flex>
                  </Flex>
                  
                  {index < productosCarrito.length - 1 && (
                    <Divider style={{ margin: 0 }} />
                  )}
                </React.Fragment>
              ))}
            </Spin>
          ) : (
            <Empty
              description="Sin artículos en el carrito"
              image={emptyShoppingCart}
            />
          )}
      </Space>
    </Drawer>
  );
};

export default Carrito;