import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showError } from "utils";

const useMutation = ({
  mutationFn,
  onSuccess,
  onError
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const mutate = async (...args) => {
    setLoading(true);

    try {
      const response = await mutationFn(...args);

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
    } catch (err) {
      const isNetworkError = err instanceof TypeError;
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