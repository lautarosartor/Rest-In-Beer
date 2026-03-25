import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { showError } from "utils";

const useQuery = ({
  queryFn,
  args = [],
  autoFetch = true,
  onSuccess = () => {},
  onError = () => {},
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(autoFetch ? true: false);

  const refetch = useCallback(async (...args) => {
    setLoading(true);

    try {
      const response = await queryFn(...args);

      switch (response?.code) {
        case "TOKEN_INVALID":
          showError({ title: response.message });
          localStorage.removeItem("token");
          navigate("/login");
          return;
          
        case "CLIENT_TOKEN_INVALID":
          showError({ title: response.message });
          localStorage.removeItem("client_token");
          navigate("/sesion/auth", { state: { redirectTo: location } } );
          return;
      }

      switch (response.status) {
        case "success":
          setData(response);
          onSuccess?.(response);
          return response;
      
        case "error":
          throw new Error(response.message || "Error inesperado.");
      }
    } catch (err) {
      const isNetworkError = err instanceof TypeError;
      const msg = isNetworkError
        ? "El servicio no está disponible en este momento."
        : err?.message || "Error inesperado.";

      err.message = msg;
      setError(msg);
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