import { useToast } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { api } from "../services/api";

const useSesion = () => {
  const [sesiones, setData] = useState([]);
  const [loadingSesiones, setLoading] = useState(false);
  const toast = useToast();

  const deleteSesion = async (id) => {
    setLoading(true);

    try {
      const response = await api.sesiones.deleteSesion(id);

      if (response.status === "success") {
        localStorage.removeItem("clienteID");
        localStorage.removeItem("sesionID");
        
        setTimeout(() => {
          toast({
            title: response.message,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          })
        }, 700);
      }
      else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })
    }
  }

  const getSesiones = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.sesiones.getAllSesiones();

      if (response.status === "success") {
        setData(response.data.sesiones || []);
      }
      else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: `${error.message}. Intentalo de nuevo más tarde.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      })
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    sesiones,
    getSesiones,
    loadingSesiones,
    deleteSesion,
  }
}

export default useSesion;