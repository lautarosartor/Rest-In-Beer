import { useState } from "react";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";
import useMutation from "hooks/useMutation";
import { createProduct } from "./api";
import { showErrorToastify, showSuccessToastify } from "utils";
import Formulario from './Formulario';

const Nuevo = ({ closeModal }) => {
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

  const create = useMutation({
    mutationFn: createProduct,
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
    
    create.mutate(payload);
  }

  return (
    <Formulario 
      title="Crear nuevo producto"
      okText="Crear"
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      closeModal={closeModal}
      confirmLoading={create.loading}
    />
  );
}

// Validacion de props
Nuevo.propTypes = {
  closeModal: PropTypes.func,
};


export default Nuevo;