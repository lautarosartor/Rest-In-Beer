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
  Button,
} from '@chakra-ui/react'
import { EditIcon, SettingsIcon, TimeIcon } from '@chakra-ui/icons'
import "moment/locale/es";
import moment from "moment-timezone";
import InputBusqueda from 'components/InputBusqueda';
import { FaCashRegister } from "react-icons/fa6";
import useSesiones from './useSesiones';
import { useState } from 'react';
import './styles.css'

const SesionesPage = () => {
  const [toggleActivas, setToggleActivas] = useState("SI");
  const { sesiones, loading, fetchSesiones } = useSesiones(toggleActivas);

  const handleToggleActivas = () => {
    const newState = toggleActivas === "NO" ? "SI" : "NO";
    setToggleActivas(newState);
    fetchSesiones(newState);
  };

  return (
    <TableContainer py={5}>
      <p className="font-bold text-center text-4xl">
        SESIONES
      </p>

      <div className="flex gap-5 my-10">
        <InputBusqueda />
        <Button onClick={handleToggleActivas}>
          {toggleActivas === "NO" ? "Mostrar activas" : "Mostrar todo"}
        </Button>
      </div>

      <Table
        variant="simple"
        colorScheme="gray"
        className="border shadow shadow-xl"
      >
        <Thead>
          <Tr>
            <Th textAlign="center" width={50}>Estado</Th>
            <Th>Mesa de la sesión</Th>
            <Th textAlign="center">Iniciada</Th>
            <Th textAlign="center">Finalizada</Th>
            <Th textAlign="center" width={50}></Th>
          </Tr>
        </Thead>

        <Tbody>
          {sesiones?.length > 0 ? (sesiones.map((s) => (
            <Tr key={s.id} className={s.activo ? 'bg-[#85CB3390]' : ''} >
              <Td textAlign="center">
                {s.activo
                  ? (
                    <span className="circulo-estado circulo-animacion"
                      style={{
                        backgroundColor: 'green',
                        boxShadow: '0 0 5px green'
                      }}
                    />
                  ) : (
                    <span className="circulo-estado"
                      style={{
                        backgroundColor: 'gray',
                      }}
                    />
                  )
                }
              </Td>

              <Td>{s.mesa.nombre_mesa}</Td>

              <Td textAlign="center">{moment(s.created_at).clone().local().format("HH:mm [h]")}</Td>

              <Td textAlign="center">
                {s.finished_at
                  ? moment(s.finished_at).clone().local().format("HH:mm [h]")
                  : "En curso..."
                }
              </Td>

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
                    <MenuItem icon={<EditIcon />}>
                      Ver
                    </MenuItem>
                    {!s.finished_at &&
                      <>
                        <MenuItem icon={<FaCashRegister />}>
                          Cobrar mesa
                        </MenuItem>
                        <MenuItem isDisabled icon={<TimeIcon />}>
                          Finalizar
                        </MenuItem>
                      </>
                    }
                  </MenuList>
                </Menu>
              </Td>
            </Tr>))
          ) : (
            <Tr>
              <Td colSpan={5} textAlign="center">
                {loading
                  ? <Spinner />
                  : "Aún no hay sesiones."
                }
              </Td>
            </Tr>
          )}
        </Tbody>

        <TableCaption>
          Tabla de Sesiones
        </TableCaption>
      </Table>
    </TableContainer>
  )
}

export default SesionesPage