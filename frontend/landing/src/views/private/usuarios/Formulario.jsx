import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input } from "postcss";

const Formulario = ({ formData, setFormData }) => {
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <>
      <FormControl isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input
          type="text"
          name="nombre"
          placeholder="Nombre"
          maxLength={45}
          value={formData.nombre || ''}
          onChange={handleOnChange}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Apellido</FormLabel>
        <Input
          type="text"
          name="apellido"
          placeholder="Apellido"
          maxLength={45}
          value={formData.apellido || ''}
          onChange={handleOnChange}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="text"
          name="nombre"
          placeholder="Nombre"
          maxLength={45}
          value={formData.nombre || ''}
          onChange={handleOnChange}
        />
      </FormControl>
    </>
  );
}

export default Formulario;