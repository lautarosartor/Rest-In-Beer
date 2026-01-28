import {
  TableContainer,
  IconButton,
  Skeleton,
  Badge,
  Tooltip,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Text,
} from '@chakra-ui/react'
import { CloseIcon, EditIcon, InfoIcon, SearchIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react';
import { config } from 'services/config';
import BtnAgregar from 'components/BtnAgregar';
import QRCode from "react-qr-code";
import NotFound from 'components/NotFound';
import useGetMesas from 'hooks/useGetMesas';
import Editar from './Editar';
import Nuevo from './Nuevo';

 const MesasPage = () => {
  const { mesas, loading, fetchMesas } = useGetMesas();
  const [filteredMesas, setFilteredMesas] = useState([]);
  const [selectedMesa, setSelectedMesa] = useState(null);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [openNuevo, setOpenNuevo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);

  const handleOpenEditar = (mesa) => {
    setSelectedMesa(mesa);
    setOpenEditar(true);
  }

  useEffect(() => {
    if (query) {
      const filtered = mesas?.filter(m =>
        m.nombre_mesa.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredMesas(filtered);
    }
    else {
      setFilteredMesas(mesas);
    }
    
  }, [mesas, query]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setShow(false);
  }

  const handleCancel = () => {
    setQuery("");
    setShow(false);
  }

  return (
    <TableContainer py={5}>
      <Text className="font-bold text-center text-4xl">
        MESAS
      </Text>

      <div className="flex gap-5 my-10">
        <BtnAgregar onClick={() => setOpenNuevo(true)} />
        <InputGroup width={250}>
          <Input
            pr='3rem'
            name="query"
            type="text"
            placeholder='Búsqueda'
            value={query}
            onChange={handleSearch}
          />
          <InputRightElement width='3rem'>
            <Button h='2rem' size='sm' onClick={handleCancel} >
              {!show && query
                ? <CloseIcon />
                : <SearchIcon />
              }
            </Button>
          </InputRightElement>
        </InputGroup>
      </div>

      {filteredMesas?.length > 0 ?(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {filteredMesas.map((m) => (
            <Skeleton
              key={m.id}
              isLoaded={!loading}
              className="relative flex flex-col p-4 gap-4 rounded-lg shadow-md w-full"
              style={{
                maxWidth: '250px', // Máximo ancho uniforme para todas las tarjetas
                minWidth: '150px', // Mínimo ancho uniforme
                boxSizing: 'border-box',
                backgroundColor: `${m.ocupada ? '#f0000050' : '#9BC4BCee'}`,
              }}
            >
              <Tooltip label="Detalles" aria-label='Detalles' borderRadius="lg">
                <IconButton
                  disabled={m.ocupada}
                  isRound={true}
                  aria-label="Options"
                  icon={<EditIcon fontSize="1.3rem" />}
                  variant="ghost"
                  color="#090909"
                  size="xs"
                  position="absolute"
                  top={0} right={0} m={1}
                  onClick={() => handleOpenEditar(m)}
                />
              </Tooltip>

              <Text className="text-2xl font-bold text-center">
                {m.nombre_mesa}
              </Text>

              <div className="flex justify-center items-center" style={{height: "100px"}}>
                {m.codigo_qr
                  ? <QRCode size={100} value={`${config.URL_BASE}/sesion/${m.codigo_qr}`} />
                  :
                  <Tooltip label="Debes generar un QR - Dirigite a los detalles" aria-label='QR help' borderRadius="lg">
                    <InfoIcon fontSize={40} color="#3B341F" />
                  </Tooltip>
                }
              </div>
              <div className="flex justify-center">
                <Badge borderRadius="full" backgroundColor="#D3FFE9" textAlign="center" px={2}>
                  <a href={`/sesion/${m.codigo_qr}`}>Para {m.capacidad}</a>
                </Badge>
              </div>

              <Text className="text-sm text-center text-wrap">
                {m.descripcion}
              </Text>
            </Skeleton>
          ))}
        </div>
      ) : (
        <NotFound
          tipo={2}
          message="No se encontro la mesa que buscabas."
          height="100%"
        />
      )}

      {openNuevo &&
        <Nuevo
          closeModal={() => {
            setOpenNuevo(false);
            fetchMesas();
          }}
        />
      }

      {openEditar &&
        <Editar
          mesa={selectedMesa}
          closeModal={() => {
            setOpenEditar(false);
            fetchMesas();
          }}
        />
      }
    </TableContainer>
  )
}

export default MesasPage;