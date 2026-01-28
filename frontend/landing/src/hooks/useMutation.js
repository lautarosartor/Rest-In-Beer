import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useMutation = ({
  mutationFn,
  onSuccess,
  onError
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const mutate = async (...args) => {
    setLoading(true);

    try {
      const data = await mutationFn(...args);

      if (data.message === "invalid or expired jwt") {
        toast({
          title: "La sesión ha expirado",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        navigate("/login");
        return;
      }

      if (data.status ===  "error") {
        throw new Error(data.message || "Error de servidor inesperado.");
      }

      setData(data);
      onSuccess && onSuccess(data);

    } catch (error) {
      const msg = error || "El servicio no está disponible en este momento";

      setError(msg)
      onError && onError(msg);
    } finally {
      setLoading(false);
    }
  }

  return {
    mutate,
    data,
    loading,
    error,
  }
}

export default useMutation;