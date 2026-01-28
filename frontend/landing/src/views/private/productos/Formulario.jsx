import PropTypes from "prop-types";
import { FormControl, FormLabel, Input, InputGroup, InputLeftElement, Select, Textarea } from "@chakra-ui/react";
import CustomModal from "components/Modal";
import useGetSubcategorias from "hooks/useGetSubcategorias";

const Formulario = ({ formData, setFormData, closeModal, onSubmit, title, okText, confirmLoading }) => {
  const { subcategoriasOptions } = useGetSubcategorias();

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
      okText={okText}
      onOk={() => onSubmit()}
      closeText="Cancelar"
      confirmLoading={confirmLoading}
      as="form"
    >
      <FormControl isRequired>
        <FormLabel>Nombre del Producto</FormLabel>
        <Input
          type="text"
          name="nombre" // El nombre del campo debe coincidir con el del estado
          placeholder="Nombre"
          maxLength={45}
          value={formData.nombre || ''}
          onChange={handleOnChange}
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel>Subcategoría</FormLabel>
        <Select
          variant='outline'
          name="idsubcategoria"
          value={formData.idsubcategoria || 0}
          onChange={handleOnChange}
        >
          <option value={0} disabled hidden>
            Seleccioná una subcategoría
          </option>

          {subcategoriasOptions?.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </FormControl>

      <div className="flex gap-6">
        <FormControl isRequired mt={4}>
          <FormLabel>Precio</FormLabel>
          <InputGroup>
            <InputLeftElement color="gray.300" fontSize="1.2em">
              $
            </InputLeftElement>
            <Input
              type="number"
              name="precio" // Nombre coincide con el del estado
              placeholder="Precio"
              value={formData.precio || ''}
              onChange={handleOnChange}
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Stock</FormLabel>
          <Input
            type="number"
            name="stock" // Nombre coincide con el del estado
            placeholder="Stock"
            value={formData.stock || ''}
            onChange={handleOnChange}
          />
        </FormControl>
      </div>

      <FormControl mt={4}>
        <FormLabel>Imagen</FormLabel>
        <Input
          type="text"
          name="img_url" // Nombre coincide con el del estado
          placeholder="URL imagen"
          maxLength={255}
          value={formData.img_url || ''}
          onChange={handleOnChange}
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          resize="none"
          name="descripcion" // Nombre coincide con el del estado
          placeholder="Descripción"
          maxLength={200}
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