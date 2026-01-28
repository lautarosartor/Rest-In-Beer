import { EditIcon, SettingsIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import BtnAgregar from 'components/BtnAgregar';
import InputBusqueda from 'components/InputBusqueda';
import { useState } from 'react';
import useGetUsuarios from './hooks/useGetUsuarios';
import Usuario from './Editar';

const UsuariosPage = () => {
  const { usuarios, loadingUsuarios, getUsuarios } = useGetUsuarios();
  const [selectedUsuarioId, setSelectedUsuarioId] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenEditar = (id) => {
    setSelectedUsuarioId(id);
    onOpen();
  }

  return (
    <TableContainer py={5}>
      <p className="font-bold text-center text-4xl">
        USUARIOS
      </p>

      <div className="flex gap-5 my-10">
        <BtnAgregar isDisabled onClick={() => handleOpenEditar(0)} />
        <InputBusqueda />
      </div>

      <Table
        colorScheme="gray"
        className="border shadow shadow-xl"
      >
        <Thead>
          <Tr>
            <Th textAlign="center" width={50}>#</Th>
            <Th>Nombre y Apellido</Th>
            <Th>Email</Th>
            <Th>Telefono</Th>
            <Th textAlign="center" width={100}>Rol</Th>
            <Th textAlign="center" width={50}></Th>
          </Tr>
        </Thead>

        <Tbody>
          {usuarios?.length > 0 ? (usuarios.map((u) => (
            <Tr
              key={u.id}
              onDoubleClick={() => handleOpenEditar(u)}
            >
              <Td textAlign="center">{u.id}</Td>

              <Td>{u.nombre} {u.apellido}</Td>

              <Td>{u.email}</Td>

              <Td>{u.telefono}</Td>

              <Td textAlign="center">{u.rol?.nombre}</Td>

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
                    <MenuItem
                      icon={<EditIcon />}
                      onClick={() => handleOpenEditar(u.id)}
                    >
                      Ver
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>))
          ) : (
            <Tr>
              <Td colSpan={6} textAlign="center">
                {loadingUsuarios
                  ? <Spinner />
                  : "Aún no hay usuarios."
                }
              </Td>
            </Tr>
          )}
        </Tbody>

        <TableCaption>
          Tabla de Usuarios
        </TableCaption>
      </Table>

      {/*Modal*/}
      {isOpen &&
        <Usuario
          usuarioId={selectedUsuarioId}
          closeModal={() => {
            getUsuarios();
            onClose();
          }}
        />
      }
    </TableContainer>
  )
}

export default UsuariosPage