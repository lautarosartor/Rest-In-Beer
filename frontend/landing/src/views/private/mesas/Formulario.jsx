import PropTypes from "prop-types";
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { MdPeopleOutline } from "react-icons/md";
import CustomModal from "components/Modal";

const Formulario = ({ formData, setFormData, closeModal, onSubmit, title, okText, confirmLoading }) => {

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <CustomModal
      isOpen={true}
      onClose={closeModal}
      title={title}
      okText={okText || "Guardar"}
      onOk={() => onSubmit()}
      closeText="Cancelar"
      confirmLoading={confirmLoading}
      as="form"
    >
      <div className="flex gap-4">
        <FormControl isRequired>
          <FormLabel>Nombre de la mesa</FormLabel>
          <Input
            type="text"
            name="nombre_mesa"
            placeholder='Nombre'
            maxLength={5}
            value={formData.nombre_mesa || ''}
            onChange={handleOnChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel display="flex" alignItems="center">
            Capacidad <MdPeopleOutline className="ml-2" />
          </FormLabel>
          <Input
            name="capacidad"
            placeholder="Capacidad"
            value={formData.capacidad || ''}
            onChange={handleOnChange}
          />
        </FormControl>
      </div>

      <FormControl mt={4}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          resize={"none"}
          name="descripcion"
          placeholder='Descripción'
          maxLength={45}
          value={formData.descripcion || ''}
          onChange={handleOnChange}
        />
      </FormControl>
    </CustomModal>
  );
}

// Validacion de props
Formulario.propTypes = {
  formData: PropTypes.any,
  setFormData: PropTypes.any,
  closeModal: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  okText: PropTypes.string,
  confirmLoading: PropTypes.bool,
};

export default Formulario;