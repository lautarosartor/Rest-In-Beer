import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const useQuery = ({
  queryFn,
  onSuccess,
  onError,
  args = [],
  autoFetch = true
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(autoFetch ? true: false);
  const toast = useToast();

  const refetch = async (...args) => {
    setLoading(true);

    try {
      const data = await queryFn(...args);

      if (data.message === "invalid or expired jwt") {
        toast({
          title: "La sesión ha expirado",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (data.status !== "error") {
        setData(data);
        onSuccess && onSuccess(data);
        return data;
      }

      throw new Error(data.message || "Error de servidor inesperado.");
      
    } catch (error) {
      const msg = error || "El servicio no está disponible en este momento."

      setError(msg)
      onError && onError(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!autoFetch) return;
    
    refetch(...args);
  }, [...args]);

  return {
    data,
    error,
    loading,
    refetch,
  }
}

export default useQuery;