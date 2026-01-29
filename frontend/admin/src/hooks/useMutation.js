import { message } from "antd";
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

  const mutate = async (...args) => {
    setLoading(true);

    try {
      const data = await mutationFn(...args);

      if (data.message === "invalid or expired jwt") {
        message.error("La sesión ha expirado");

        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (data.status ===  "error") {
        throw data;
      }

      setData(data);
      onSuccess && onSuccess(data);

    } catch (error) {
      error.message = (error.message || "El servicio no está disponible en este momento");
      setError(error)
      onError && onError(error);
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