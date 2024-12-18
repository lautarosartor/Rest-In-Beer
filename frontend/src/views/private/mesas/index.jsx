import {
  TableContainer,
  IconButton,
  useDisclosure,
  Skeleton,
  Badge,
  Tooltip,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from '@chakra-ui/react'
import { CloseIcon, EditIcon, InfoIcon, SearchIcon } from '@chakra-ui/icons'
import useMesa from '../../../hooks/hookMesa';
import Mesa from './Mesa';
import { useEffect, useState } from 'react';
import BtnAgregar from '../../../components/BtnAgregar';
import QRCode from "react-qr-code";
import NotFound from '../../../components/NotFound';
import { URL_BASE } from '../../../services/config';

 const MesasPage = () => {
  const { getMesas, mesas, loadingMesas } = useMesa();
  const [filteredMesas, setFilteredMesas] = useState([]);
  const [selectedMesaId, setSelectedMesaId] = useState(0);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenModal = (id) => {
    setSelectedMesaId(id);
    onOpen();
  }

  useEffect(() => {
    if (!isOpen) {
      getMesas();
    }
  }, [isOpen, getMesas]);

  useEffect(() => {
    if (query) {
      // Sino que se filtra la query en el cliente
      const filtered = mesas?.filter(m =>
        m.nombre_mesa.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredMesas(filtered);
    }
    else {
      setFilteredMesas(mesas);
    }
    
  }, [mesas, query, getMesas]);

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
      <p className="font-bold text-center text-4xl">
        MESAS
      </p>

      <div className="flex gap-5 my-10">
        <BtnAgregar onClick={() => handleOpenModal(0)} />
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
              isLoaded={!loadingMesas}
              className="relative flex flex-col p-4 gap-4 rounded-lg shadow-md w-full"
              style={{
                maxWidth: '250px', // Máximo ancho uniforme para todas las tarjetas
                minWidth: '150px', // Mínimo ancho uniforme
                boxSizing: 'border-box',
                backgroundColor: '#9BC4BCee',
              }}
            >
              <Tooltip label="Detalles" aria-label='Detalles' borderRadius="lg">
                <IconButton
                  isRound={true}
                  aria-label="Options"
                  icon={<EditIcon fontSize="1.3rem" />}
                  variant="ghost"
                  color="#090909"
                  size="xs"
                  position="absolute"
                  top={0} right={0} m={1}
                  onClick={() => handleOpenModal(m.id)}
                />
              </Tooltip>

              <p className="text-2xl font-bold text-center">
                Mesa: {m.nombre_mesa}
              </p>

              <div className="flex justify-center items-center" style={{height: "100px"}}>
                {m.codigo_qr
                  ? <QRCode size={100} value={`${URL_BASE}/${m.codigo_qr}`} />
                  :
                  <Tooltip label="Debes generar un QR - Dirigite a los detalles" aria-label='QR help' borderRadius="lg">
                    <InfoIcon fontSize={40} color="#3B341F" />
                  </Tooltip>
                }
              </div>
              <div className="flex justify-center">
                <Badge borderRadius="full" backgroundColor="#D3FFE9" textAlign="center" px={2}>
                  <a href={`/${m.codigo_qr}`}>Para {m.capacidad}</a>
                </Badge>
              </div>

              <p className="text-sm text-center">
                {m.descripcion}
              </p>
            </Skeleton>
          ))}
        </div>
      ) : (
        <NotFound tipo={2} />
      )}

      {/*Modal*/}
      <Mesa
        open={isOpen}
        close={onClose}
        mesaId={selectedMesaId}
      />
    </TableContainer>
  )
}

export default MesasPage