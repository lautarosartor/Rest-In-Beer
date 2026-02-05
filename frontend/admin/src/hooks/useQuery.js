import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showError } from "utils";

const useQuery = ({
  queryFn,
  args = [],
  autoFetch = true,
  onSuccess = () => {},
  onError = () => {},
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(autoFetch ? true: false);

  const refetch = useCallback(async (...args) => {
    setLoading(true);

    try {
      const response = await queryFn(...args);

      if (response.message === "invalid or expired jwt") {
        showError({ title: "Sesión expirada" });

        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (response.status === "error") {
        throw new Error(response.message || "Error inesperado.");
      }

      if (response.status === "success") {
        setData(response);
        onSuccess?.(response);
        return response;
      }
    } catch (err) {
      const msg = err?.message || "El servicio no está disponible en este momento."

      setError(msg)
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [queryFn, onSuccess, onError]);

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