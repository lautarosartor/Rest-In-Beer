import { Table } from "antd";
import AddButton from "components/Buttons/AddButton";
import ContentWithHeader from "components/ContentWithHeader";
import { CANCEL } from "constants/index";
import { useState } from "react";
import { formatCurrency } from "utils";
import Editar from "./components/Editar";
import Nuevo from "./components/Nuevo";
import useGetProductos from "./useGetProductos";

const Productos = () => {
  const [openNuevo, setOpenNuevo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const { productos, loading, total, pagination, fetchProductos, onTableChange } = useGetProductos();

  const handleOpenEditar = (record) => {
    setOpenEditar(true);
    setSelectedProducto(record);
  }

  const handleCloseEditar = (action) => {
    setOpenEditar(false);
    setSelectedProducto(null);
    if (action !== CANCEL) {
      fetchProductos();
    }
  }

  const handleCloseNuevo = (action) => {
    setOpenNuevo(false);
    if (action !== CANCEL) {
      fetchProductos();
    }
  }

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      width: 60,
    },
    {
      title: "Nombre",
      dataIndex: "nombre"
    },
    {
      title: "Categoría",
      dataIndex: "categoria",
    },
    {
      title: "Subcatergoría",
      dataIndex: "subcategoria",
    },
    {
      title: "Precio",
      dataIndex: "precio",
      align: "right",
      render: (value) => formatCurrency(value),
    },
  ];

  return (
    <ContentWithHeader
      title="Productos"
      actions={
        <AddButton
          text="Nuevo producto"
          onClick={() => setOpenNuevo(true)}
        />
      }
    >
      <Table
        rowKey="id"
        columns={columns}
        dataSource={productos}
        loading={loading}
        pagination={{ ...pagination, total }}
        onChange={onTableChange}
        onRow={(record) => ({
          onDoubleClick: () => handleOpenEditar(record),
        })}
      />

      {openNuevo &&
        <Nuevo
          onClose={handleCloseNuevo}
        />
      }

      {openEditar &&
        <Editar
          producto={selectedProducto}
          onClose={handleCloseEditar}
        />
      }
    </ContentWithHeader>
  );
}

export default Productos;