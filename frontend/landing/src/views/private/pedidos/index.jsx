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
  UnorderedList,
  ListItem,
  Tag,
} from '@chakra-ui/react'
import React, { useState } from 'react';
import moment from 'moment-timezone';
import 'moment/locale/es';
import { CheckIcon, CloseIcon, EditIcon, SettingsIcon } from '@chakra-ui/icons'
import { FaClipboardList } from "react-icons/fa";
import usePedidos from './usePedidos';
import InputBusqueda from 'components/InputBusqueda';
import VerPedido from './components/VerPedido';

const PedidosPage = () => {
  const { pedidos, loading, fetchPedidos } = usePedidos();
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [verPedido, setVerPedido] = useState(false);

  const handleVerPedido = (pedido) => {
    setSelectedPedido(pedido);
    setVerPedido(true);
  }

  return (
    <TableContainer py={5}>
      <p className="font-bold text-center text-4xl">
        PEDIDOS
      </p>

      <div className="flex gap-5 my-10">
        <InputBusqueda />
      </div>

      <Table
        colorScheme="gray"
        className="shadow shadow-xl"
      >
        <Thead>
          <Tr>
            <Th textAlign="center" maxW={50}>#</Th>
            <Th textAlign="center" maxW={50}>Lista</Th>
            <Th minW={300}>Mesa</Th>
            <Th textAlign="center" maxW={200}>Pedido</Th>
            <Th textAlign="center" maxW={150}>Estado</Th>
            <Th textAlign="center" maxW={200}>Entregado</Th>
            <Th textAlign="center" maxW={150}>Total</Th>
            <Th textAlign="center" maxW={50}></Th>
          </Tr>
        </Thead>

        <Tbody>
          {pedidos?.length > 0 ? (pedidos.map((p) => (
            <Tr key={p.id} onDoubleClick={p?.items ? () => handleVerPedido(p) : undefined}>
              <Td fontWeight="bold">{p.id}</Td>

              <Td textAlign="center">
                <Tooltip
                  minWidth={250}
                  placement="right-start"
                  hasArrow
                  borderRadius={5}
                  fontSize={15}
                  color="#D3FFE9"
                  label={ p?.items &&
                    <UnorderedList>
                      {p?.items?.map((item, index) => (
                          <React.Fragment key={item.id}>
                            <ListItem>
                              <div className="flex justify-between gap-4 py-2">
                                <p>{item.producto.nombre}</p> <span>x{item.cantidad}</span>
                              </div>
                            </ListItem>
                            <hr />
                            {index === p.items.length - 1 && (
                              <ListItem className="flex justify-between font-bold py-2">
                                <span>Total:</span>
                                <span>
                                  $ {p.items.reduce((acc, item) => acc + item.subtotal, 0)}
                                </span>
                              </ListItem>
                            )}
                          </React.Fragment>
                        ))}
                    </UnorderedList>
                  }
                >
                  <IconButton
                    isDisabled={!p?.items}
                    variant="none"
                    icon={<FaClipboardList fontSize={30} />}
                    onClick={() => handleVerPedido(p)}
                  />
                </Tooltip>
              </Td>

              <Td whiteSpace="pre-line">
                {p.sesion?.mesa?.nombre_mesa} - {p.sesion?.mesa?.descripcion}
              </Td>

              <Td textAlign="center">
                {/* {moment(p.created_at).fromNow()} */}
                {moment(p.created_at).clone().local().format("HH:mm [h]")}
              </Td>

              <Td textAlign="center">
                <Tag
                  variant="solid"
                  borderRadius='full'
                  bg={
                    p.estado?.descripcion === 'Entregado' ? 'green.500'
                    : p.estado?.descripcion === 'En preparación' ? 'yellow.500' : 'red.500'
                  }
                >
                  {p.estado?.descripcion}
                </Tag>
              </Td>

              <Td textAlign="center">
                {p.delivered_at
                  ? moment(p.delivered_at).clone().local().format("HH:mm [h]")
                  : 'No aún'
                }
              </Td>

              <Td textAlign="center" fontWeight="bold">$ {p.total}</Td>

              <Td textAlign="center">
                <Menu>
                  <MenuButton
                    isDisabled={!p?.items}
                    as={IconButton}
                    isRound={true}
                    aria-label='Options'
                    icon={<SettingsIcon />}
                    variant='solid'
                  />
                  <MenuList boxShadow='lg'>
                    <MenuItem
                      onClick={() => handleVerPedido(p)}
                      icon={<EditIcon />}
                    >
                      Ver
                    </MenuItem>
                    <MenuItem icon={<CheckIcon />}>
                      Aceptar
                    </MenuItem>
                    <MenuItem icon={<CloseIcon fontSize={10} />}>
                      Rechazar
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>))
          ) : (
            <Tr>
              <Td colSpan={8} textAlign="center">
                {loading
                  ? <Spinner />
                  : "Aún no hay pedidos."
                }
              </Td>
            </Tr>
          )}
        </Tbody>

        <TableCaption>
          Tabla de Pedidos
        </TableCaption>
      </Table>
      
      {verPedido &&
        <VerPedido
          pedido={selectedPedido}
          closeModal={() => {
            setVerPedido(false);
            fetchPedidos();
          }}
        />
      }
    </TableContainer>
  )
}

export default PedidosPage;