import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";
import useMutation from "hooks/useMutation";
import { updateProduct } from "./api";
import { showErrorToastify, showSuccessToastify } from "utils";
import Formulario from "./Formulario";

const Editar = ({ producto, closeModal }) => {
  const initForm = useState({
    idsubcategoria: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    img_url: '',
  });
  const [formData, setFormData] = useState(initForm);
  const toast = useToast();

  const update = useMutation({
    mutationFn: updateProduct,
    onSuccess: (res) => {
      showSuccessToastify({ toast, res });
      closeModal();
    },
    onError: (err) => showErrorToastify({ toast, err }),
  });

  const onSubmit = () => {
    if (formData.precio < 0) {
      showErrorToastify({ toast, err: "El precio no puede ser menor a 0." });
      return;
    }

    const payload = {
      ...formData,
      idsubcategoria: parseInt(formData.idsubcategoria),
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock),
    }
    
    update.mutate(producto.id, payload);
  }

  useEffect(() => {
    if (producto) {
      setFormData({
        idsubcategoria: producto.idsubcategoria || 0,
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        precio: producto.precio || 0,
        stock: producto.stock || 0,
        img_url: producto.img_url || ''
      });
    }
  }, [producto]);

  return (
    <Formulario 
      title={`Editar producto ${producto.id}`}
      okText="Guardar"
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      closeModal={closeModal}
      confirmLoading={update.loading}
    />
  );
}

// Validacion de props
Editar.propTypes = {
  producto: PropTypes.object,
  closeModal: PropTypes.func,
};

export default Editar;