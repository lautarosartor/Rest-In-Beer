import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Box,
  Image,
  Flex,
  Text
} from '@chakra-ui/react'
import { EditIcon, SettingsIcon } from '@chakra-ui/icons'
import InputBusqueda from 'components/InputBusqueda';
import { useState } from 'react';
import BtnAgregar from 'components/BtnAgregar';
import useProductos from './useProductos';
import Nuevo from './Nuevo';
import Editar from './Editar';

const ProductosPage = () => {
  const { productos, loading, fetchProductos } = useProductos();
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [openNuevo, setOpenNuevo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);

  const handleOpenEditar = (producto) => {
    setSelectedProducto(producto);
    setOpenEditar(true);
  }

  return (
    <TableContainer py={5}>
      <p className="font-bold text-center text-4xl">
        PRODUCTOS
      </p>

      <div className="flex gap-5 my-10">
        <BtnAgregar onClick={() => setOpenNuevo(true)} />
        <InputBusqueda />
      </div>

      <Table
        colorScheme="gray"
        className="shadow shadow-xl"
      >
        <Thead>
          <Tr>
            <Th textAlign="center" width={100}>Imagen</Th>
            <Th>Producto</Th>
            <Th textAlign="center" width={200}>Precio</Th>
            <Th textAlign="center" width={200}>Stock</Th>
            <Th textAlign="center" width={50}></Th>
          </Tr>
        </Thead>

        <Tbody>
          {productos?.length > 0 ? (productos.map((p) => (
            <Tr key={p.id} onDoubleClick={() => handleOpenEditar(p)}>
              <Td maxWidth={100} py={1}>
                <Tooltip
                  placement="right-start"
                  label={
                    <Image 
                      src={p.img_url} 
                      alt={p.nombre}
                      maxH="250px" // Ajusta el tamaño que desees
                      objectFit="contain" // Mantiene la proporción de la imagen
                      borderRadius="5px"
                      objectPosition="left"
                    />
                  }
                  backgroundColor="transparent"
                  boxShadow="none"
                  display="flex"
                  justifyContent="center"
                >
                  <Box display="flex" justifyContent="center">
                    <Image 
                      src={p.img_url} 
                      alt={p.nombre} 
                      maxW="60px" 
                      maxH="60px" 
                    />
                  </Box>
                </Tooltip>
              </Td>

              <Td>
                <Flex justifyContent="space-between" flexWrap="wrap" gap={4}>
                  <Text>{p.nombre}</Text>
                  <Text>{p.descripcion}</Text>
                </Flex>
              </Td>

              <Td textAlign="center">$ {p.precio}</Td>

              <Td textAlign="center">{p.stock}</Td>

              <Td textAlign="center">
                <Menu>
                  <MenuButton
                    as={IconButton}
                    isRound={true}
                    aria-label='Options'
                    icon={<SettingsIcon />}
                    variant='solid'
                  />
                  <MenuList boxShadow='lg'>
                    <MenuItem onClick={() => handleOpenEditar(p)} icon={<EditIcon />}>
                      Ver
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>))
          ) : (
            <Tr>
              <Td colSpan={5} textAlign="center">
                {loading
                  ? <Spinner />
                  : "Aún no hay productos."
                }
              </Td>
            </Tr>
          )}
        </Tbody>

        <TableCaption>
          Tabla de Productos
        </TableCaption>
      </Table>
      
      {openNuevo &&
        <Nuevo
          closeModal={() => {
            setOpenNuevo(false);
            fetchProductos();
          }}
        />
      }

      {openEditar &&
        <Editar
          producto={selectedProducto}
          closeModal={() => {
            setOpenEditar(false);
            fetchProductos();
          }}
        />
      }
    </TableContainer>
  )
}

export default ProductosPage