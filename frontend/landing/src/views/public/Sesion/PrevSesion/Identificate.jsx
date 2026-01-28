import { Box, FormControl, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import CustomModal from "components/Modal";
import useMutation from "hooks/useMutation";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorToastify, showSuccessToastify } from "utils";
import { createClient } from "./api";

const Identificate = ({ closeModal }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [color, setColor] = useState("#DDFFAA");

  const create = useMutation({
    mutationFn: createClient,
    onSuccess: (res) => {
      localStorage.setItem("dni", dni);
      localStorage.setItem("cliente", nombre + " " + apellido);
      localStorage.setItem("color", color);

      showSuccessToastify({
        toast,
        res: nombre + ", " + res.message
      });

      setTimeout(() => {
        closeModal();
      }, 700);
    },
    onError: (err) => showErrorToastify({ toast, err }),
  });

  const handleSave = () => {
    if (nombre.trim() === "" || apellido.trim() === "" || dni.trim() === "") {
      showErrorToastify({ toast, err: "Completá el formulario con tus Datos." });
      return;
    }

    const payload = {
      nombre,
      apellido,
      dni,
    }
    
    create.mutate(payload);
  }

  return (
    <CustomModal
      isOpen={true}
      onClose={() => {
        closeModal();
        navigate(-1);
      }}
      title="Identificate"
      onOk={() => handleSave()}
      closeText="Volver"
      as="form"
      closeOnEsc={false}
    >
      <Box display="flex" gap={4}>
        <FormControl isRequired>
          <FormLabel>Nombre</FormLabel>
          <Input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={nombre || ''}
            onChange={(e) => setNombre(e.target.value)}
            autoComplete="off"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Apellido</FormLabel>
          <Input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={apellido || ''}
            onChange={(e) => setApellido(e.target.value)}
            autoComplete="off"
          />
        </FormControl>
      </Box>

      <FormControl isRequired mt={4}>
        <FormLabel>Documento</FormLabel>
        <Input
          type="text"
          name="dni"
          placeholder="DNI"
          value={dni || ''}
          onChange={(e) => setDni(e.target.value)}
          autoComplete="off"
        />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Elegí tu color</FormLabel>
        <Input
        width={20}
          type="color"
          name="color"
          value={color || ''}
          onChange={(e) => setColor(e.target.value)}
        />
      </FormControl>

      <Text textAlign="center" marginTop=".5rem">
        Estos datos usaremos para identificarte
      </Text>
    </CustomModal>
  );
}

// Validacion de props
Identificate.propTypes = {
  closeModal: PropTypes.func,
};

export default Identificate;