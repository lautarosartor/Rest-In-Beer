import { ExportOutlined, SettingOutlined } from "@ant-design/icons";
import { Alert, Card, Descriptions, Flex, QRCode, Tooltip } from "antd";
import AddButton from "components/Buttons/AddButton";
import ContentWithHeader from "components/ContentWithHeader";
import { CANCEL, useIsMobile, } from "constants/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "services/config";
import Editar from "./components/Editar";
import Nuevo from "./components/Nuevo";
import useGetMesas from "./useGetMesas";

const Mesas = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [openNuevo, setOpenNuevo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const { mesas, loading, total, fetchMesas } = useGetMesas();

  const items = [
    {
      key: 1,
      label: "Mesas Totales",
      children: total,
    },
    {
      key: 2,
      label: "Mesas Ocupadas",
      children: total,
    },
    {
      key: 3,
      label: "Mesas Disponibles",
      children: total,
    },
  ];

  const handleOpenEditar = (record) => {
    setOpenEditar(true);
    setSelectedMesa(record);
  }

  const handleCloseEditar = (action) => {
    setOpenEditar(false);
    setSelectedMesa(null);
    if (action !== CANCEL) {
      fetchMesas();
    }
  }

  const handleCloseNuevo = (action) => {
    setOpenNuevo(false);
    if (action !== CANCEL) {
      fetchMesas();
    }
  }

  return (
    <ContentWithHeader
      title="Mesas"
      actions={
        <AddButton
          text="Nueva mesa"
          onClick={() => setOpenNuevo(true)}
        />
      }
    >
      <Descriptions
        items={items}
        style={{ maxWidth: 500 }}
        styles={{ label: { width: '130px' } }}
      />
      
      <div
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns:
            isMobile
            ? "1fr"
            : "repeat(auto-fill, minmax(200px, 1fr))",
          gap: isMobile ? 16 : 24,
        }}
      >
        {mesas?.map((mesa) => (
          <Card
            key={mesa.id}
            loading={loading}
            size="small"
            title={mesa.nombre_mesa}
            actions={[
              <Tooltip
                key="1"
                title="Ir a la mesa"
                mouseLeaveDelay={0}
              >
                <ExportOutlined
                  onClick={() => navigate(`/sesion/${mesa.codigo_qr}`)}
                />
              </Tooltip>,
              <Tooltip
                key="2"
                title="Detalles"
                mouseLeaveDelay={0}
              >
                <SettingOutlined
                  onClick={() => handleOpenEditar(mesa)}
                />
              </Tooltip>
            ]}
            styles={{
              body: {
                backgroundColor: `${
                  mesa.ocupada
                  ? '#DC4446'
                  : '#59c99e'
                }`,
              }
            }}
          >
            <Flex justify="center">
              {mesa.codigo_qr ? (
                <QRCode
                  size={100}
                  bordered={false}
                  value={`${config.URL_BASE}/sesion/${mesa.codigo_qr}`}
                />
              ) : (
                <Alert
                  showIcon
                  type="warning"
                  title="Mesa sin QR"
                  description="Debes generar un QR - Dirigite a los detalles"
                />
              )}
            </Flex>
          </Card>
        ))}
      </div>

      {openNuevo &&
        <Nuevo
          onClose={handleCloseNuevo}
        />
      }

      {openEditar &&
        <Editar
          mesa={selectedMesa}
          onClose={handleCloseEditar}
        />
      }
    </ContentWithHeader>
  );
}

export default Mesas;