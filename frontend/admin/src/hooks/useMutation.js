import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showError } from "utils";
import useIdempotency from "./useIdempotency";

const useMutation = ({
  mutationFn,
  onSuccess,
  onError,
  idempotency = false,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { getKey, resetKey } = useIdempotency();

  const mutate = async (...args) => {
    if (loading) return;

    setLoading(true);

    try {
      let finalArgs = args;

      // si usa idempotencia → inyectar key
      if (idempotency) {
        const key = getKey();
        finalArgs = [...args, key]; // SIEMPRE como último argumento
      }

      const response = await mutationFn(...finalArgs);

      if (response.code === "TOKEN_INVALID") {
        showError({ title: response.message });

        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (response.code === "CLIENT_TOKEN_INVALID") {
        showError({ title: response.message });

        localStorage.removeItem("client_token");
        navigate("/sesion/auth");
        return;
      }

      if (response.status ===  "error") {
        throw new Error(response.message || "Error inesperado.");
      }

      setData(response);
      onSuccess?.(response);

      if (idempotency) {
        resetKey();
      }
    } catch (err) {
      const isNetworkError = err instanceof TypeError;

      if (idempotency && !isNetworkError) {
        // si NO es error de red → resetear
        resetKey();
      }

      const msg = isNetworkError
        ? "El servicio no está disponible en este momento."
        : err?.message || "Error inesperado.";

      err.message = msg;
      setError(msg);
      onError?.(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 700);
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