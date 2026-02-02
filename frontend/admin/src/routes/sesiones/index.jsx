import { CreditCardOutlined, EllipsisOutlined, ExportOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Dropdown, Table } from "antd";
import ContentWithHeader from "components/ContentWithHeader";
import { useNavigate } from "react-router-dom";
import { formatDate } from "utils";
import "./styles.css";
import useGetSesiones from "./useGetSesiones";

const Sesiones = () => {
  const navigate = useNavigate();
  const { sesiones, loading, total, pagination, onTableChange } = useGetSesiones();
  
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      width: 60,
    },
    {
      title: "Estado",
      dataIndex: "activo",
      align: "center",
      width: 80,
      render: (value) => value ? (
        <span className="circulo-estado circulo-animacion"
          style={{
            backgroundColor: 'green',
            boxShadow: '0 0 5px green'
          }}
        />
      ) : (
        <span className="circulo-estado"
          style={{
            backgroundColor: 'gray',
          }}
        />
      )
    },
    {
      title: "Mesa de la sesión",
      dataIndex: "mesa",
    },
    {
      title: "Creador",
      dataIndex: "creador",
    },
    {
      title: "Iniciada",
      dataIndex: "created_at",
      render: (value) => formatDate(value, "HH:mm [h]"),
    },
    {
      title: "Finalizada",
      dataIndex: "finishied_at",
      render: (value) => value ? formatDate(value, "HH:mm [h]") : "En curso...",
    },
    {
      title: "Acciones",
      align: "center",
      width: 90,
      render: (record) => {
        const items = [
          {
            key: 1,
            label: "Ver sesión",
            icon: <ExportOutlined />,
            onClick: () => navigate(`/sesion/${record.codigo_qr}`),
          },
          {
            key: 2,
            label: "Cobrar mesa",
            disabled: true,
            icon: <CreditCardOutlined />,
          },
          {
            key: 3,
            label: "Finalizar",
            danger: true,
            disabled: true,
            icon: <MinusCircleOutlined />,
          },
        ];

        return (
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Button
              size="small"
              icon={<EllipsisOutlined />}
            />
          </Dropdown>
        )
      }
    }
  ];

  return (
    <ContentWithHeader
      title="Sesiones"
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={sesiones}
        loading={loading}
        pagination={{ ...pagination, total }}
        onChange={onTableChange}
      />
    </ContentWithHeader>
  );
}

export default Sesiones;