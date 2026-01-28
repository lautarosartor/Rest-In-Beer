import CustomModal from "components/Modal";
import { useState } from "react";
import Formulario from "./Formulario";

const Nuevo = ({ closeModal }) => {
  const initForm = useState({
    idrol: 0,
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: '',
  });
  const [formData, setFormData] = useState(initForm);

  const onFinish = () => {
    console.log()
  }
 
  return (
    <CustomModal
      isOpen={true}
      onClose={closeModal}
      title="Crear Usuario"
      okText="Crear"
      onOk={() => onFinish()}
      closeText="Cancelar"
      // confirmLoading={confirmLoading}
      as="form"
    >
      <Formulario
        formData={formData}
        setFormData={setFormData}
      />
    </CustomModal>
  );
}

export default Nuevo;