import { MinusOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Grid,
  Image,
  Input,
  Space,
  Typography,
} from "antd";
import useMutation from "hooks/useMutation";
import { useEffect, useState } from "react";
import { formatCurrency, showError, showNotification } from "utils";
const { Text } = Typography;
const { useBreakpoint } = Grid;

const Carrito = ({ dni, sesionID, onClose }) => {
  const screens = useBreakpoint();
  const isMobile = !screens.sm;
  const [productos, setProductos] = useState([]);
  // const { productos, onSearch } = useProductos();
  const [cantidad, setCantidad] = useState({});

  const aumentarCantidad = (id) => {
    setCantidad((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const disminuirCantidad = (id) => {
    setCantidad((prev) => ({ ...prev, [id]: Math.max(prev[id] - 1, 0) }));
  };

  useEffect(() => {
    if (productos?.length) {
      setCantidad(productos.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {}));
    }
  }, [productos]);

  /* const create = useMutation({
    // mutationFn: createPedido,
    onSuccess: (res) => {
      showNotification({ res });
      onClose();
    },
    onError: (err) => showError({ err }),
  }); */

  const handlePedir = () => {
    if (!Object.values(cantidad).some((v) => v > 0)) {
      return showNotification({ msg: "Debe seleccionar al menos un producto." });
    }

    const items = Object.entries(cantidad)
      .filter(([, c]) => c > 0)
      .map(([idproducto, c]) => ({ idproducto: Number(idproducto), cantidad: c }));

    console.log(dni, sesionID, items)
    // create.mutate({ dni, idsesion: Number(sesionID), items });
  };

  return (
    <Drawer
      title="Productos"
      open={true}
      onClose={onClose}
      size={isMobile ? "100%" : 400}
      placement={isMobile ? "bottom" : "right"}
      // loading={loading}
      maskClosable={false}
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
            // loading={create.loading}
            onClick={handlePedir}
          >
            Pedir
          </Button>
        </Space>
      }
    >
      <Input
        placeholder="Buscar productos..."
        suffix={<SearchOutlined />}
        // onChange={(e) => onSearch(e.target.value, "")}
        style={{ marginBottom: 24 }}
      />

      <Space orientation="vertical" size={16} style={{ width: "100%" }}>
        {productos?.map((item) => (
          <div key={item.id} style={{ display: "grid", gridTemplateColumns: "80px 1fr 100px", gap: 12, alignItems: "center" }}>
            <Image
              src={item.img_url}
              alt={item.nombre}
              width={80}
              height={80}
              style={{ objectFit: "cover", borderRadius: 12 }}
              preview={false}
            />

            <div>
              <Text
                strong
                style={{ fontSize: 15 }}
              >
                {item.nombre}
              </Text>
              <br />
              <Text
                type="secondary"
                style={{
                  fontSize: 11,
                  lineHeight: "16px"
                }}
              >
                {item.descripcion}
              </Text>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <Text strong style={{ color: "#009C63" }}>{formatCurrency(item.precio)}</Text>
              <Space.Compact>
                <Button
                  size="small"
                  icon={<MinusOutlined style={{ fontSize: 10 }} />}
                  onClick={() => disminuirCantidad(item.id)}
                />
                <Button size="small" disabled style={{ cursor: "default", width: 32 }}>
                  {cantidad[item.id]}
                </Button>
                <Button
                  size="small"
                  icon={<PlusOutlined style={{ fontSize: 10 }} />}
                  onClick={() => aumentarCantidad(item.id)}
                />
              </Space.Compact>
            </div>
          </div>
        ))}
      </Space>
    </Drawer>
  );
};

export default Carrito;