import { useState } from "react";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";
import useMutation from "hooks/useMutation";
import { createTable } from "./api";
import { showErrorToastify, showSuccessToastify } from "utils";
import Formulario from './Formulario'

const Nuevo = ({ closeModal }) => {
  const initForm = useState({
    nombre_mesa: '',
    capacidad: 0,
    codigo_qr: '',
    descripcion: '',
  });
  const [formData, setFormData] = useState(initForm);
  const toast = useToast();

  const create = useMutation({
    mutationFn: createTable,
    onSuccess: (res) => {
      showSuccessToastify({ toast, res });
      closeModal();
    },
    onError: (err) => showErrorToastify({ toast, err }),
  });

  const onSubmit = () => {
    if (formData.capacidad < 1) {
      showErrorToastify({ toast, err: "La capacidad mínima es de 1." });
      return;
    }
    else if (formData.capacidad > 20) {
      showErrorToastify({ toast, err: "La capacidad máxima es 20." });
      return;
    }

    const payload = {
      ...formData,
      capacidad: parseInt(formData.capacidad),
    }
    
    create.mutate(payload);
  }

  return (
    <Formulario 
      title="Crear nueva mesa"
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