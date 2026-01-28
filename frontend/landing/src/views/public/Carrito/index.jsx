import { AddIcon, MinusIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import CustomDrawer from "components/Drawer";
import useMutation from "hooks/useMutation";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useProductos from "views/private/productos/useProductos";
import { createPedido } from "./api";
import { showErrorToastify, showSuccessToastify, showToastify } from "utils";

const Carrito = ({ closeDrawer, dni, sesionID }) => {
  const [isMobile] = useMediaQuery("(max-width: 550px)", { ssr: false });
  const { productos, onSearch } = useProductos();
  const [cantidad, setCantidad] = useState({});
  const toast = useToast();

  const aumentarCantidad = (id) => {
    setCantidad((prevCantidad) => ({
      ...prevCantidad,
      [id]: prevCantidad[id] + 1,
    }));
  };

  const disminuirCantidad = (id) => {
    setCantidad((prevCantidad) => ({
      ...prevCantidad,
      [id]: Math.max(prevCantidad[id] - 1, 0),
    }));
  };

  useEffect(() => {
    if (productos?.length) {
      setCantidad(
        productos?.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
      );
    }
  }, [productos]);

  const create = useMutation({
    mutationFn: createPedido,
    onSuccess: (res) => {
      showSuccessToastify({ toast, res });
      closeDrawer();
    },
    onError: (err) => showErrorToastify({ toast, err }),
  });

  const handlePedir = () => {
    if (!Object.values(cantidad).some(value => value > 0)) {
      return showToastify({ toast, text: "Debe seleccionar al menos un producto.", type: "info" });
    }

    const items = Object.entries(cantidad)
      .filter(([ , cantidad]) => cantidad > 0)
      .map(([idproducto, cantidad]) => ({
        idproducto: Number(idproducto),
        cantidad,
      }));
  
    const payload = {
      dni,
      idsesion: Number(sesionID),
      items: items,
    };
  
    create.mutate(payload);
  };

  return (
    <CustomDrawer
      isOpen={true}
      onClose={closeDrawer}
      size={isMobile ? "full" : "sm"}
      placement={isMobile ? "bottom" : "right"}
      closeOnOverlayClick={false}
      title="Productos"
      okText="Pedir"
      closeText="Cerrar"
      onOk={() => handlePedir()}
      confirmLoading={create.loading}
    >
      <Box display="flex" gap={2}>
        <InputGroup>
          <Input
            placeholder="Buscar..."
            onChange={(e) => onSearch(e.target.value, "")}
          />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
      </Box>
      <Box my={10} display="flex" flexDirection="column" gap={4}>
        {productos?.map((item) => (
          <Grid key={item.id} templateColumns="80px 1fr 100px" gap={2}>
            <Image
              src={item.img_url}
              alt={item.nombre}
              h="80px"
              w="80px"
              objectFit="cover"
              objectPosition="left"
              className="rounded-xl"
            />

            <Box minW={100}>
              <Text fontWeight="medium" fontSize={15}>
                {item.nombre}
              </Text>
              <Text fontSize={11} className="leading-4">
                {item.descripcion}
              </Text>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <Text fontWeight="medium" color="#009C63">
                ${item.precio}
              </Text>
              <Box>
                <IconButton
                  size="sm"
                  icon={<MinusIcon fontSize={10} />}
                  roundedLeft="xl"
                  roundedRight="none"
                  onClick={() => disminuirCantidad(item.id)}
                />
                <Button
                  size="sm"
                  rounded="none"
                  width={25}
                  isDisabled
                  style={{ cursor: "default" }}
                >
                  {cantidad[item.id]}
                </Button>
                <IconButton
                  size="sm"
                  icon={<AddIcon fontSize={10} />}
                  roundedRight="xl"
                  roundedLeft="none"
                  onClick={() => aumentarCantidad(item.id)}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Box>
    </CustomDrawer>
  );
};

// Validacion de props
Carrito.propTypes = {
  closeDrawer: PropTypes.func,
  dni: PropTypes.string,
  sesionID: PropTypes.any,
};

export default Carrito;
