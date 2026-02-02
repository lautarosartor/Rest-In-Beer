import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";
import useMutation from "hooks/useMutation";
import { updateTable } from "./api";
import { showErrorToastify, showSuccessToastify } from "utils";
import Formulario from "./Formulario";

const Editar = ({ mesa, closeModal }) => {
  const initForm = useState({
    nombre: '',
    capacidad: 0,
    codigo_qr: '',
    descripcion: '',
  });
  const [formData, setFormData] = useState(initForm);
  const toast = useToast();

  const update = useMutation({
    mutationFn: updateTable,
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
    
    update.mutate(mesa.id, payload);
  }

  useEffect(() => {
    if (mesa) {
      setFormData({
        nombre_mesa: mesa.nombre_mesa || '',
        capacidad: mesa.capacidad || 0,
        descripcion: mesa.descripcion || '',
      });
    }
  }, [mesa]);

  return (
    <Formulario 
      title={`Editar mesa ${mesa.id}`}
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
  mesa: PropTypes.object,
  closeModal: PropTypes.func,
};

export default Editar;