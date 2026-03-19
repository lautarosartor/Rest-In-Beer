import useQuery from "hooks/useQuery";
import { showError } from "utils";
import { getSesionPedidos } from "./api";

const usePedidos = (sesionId) => {
  const { data, refetch, loading } = useQuery({
    autoFetch: false,
    queryFn: getSesionPedidos,
    onError: (err) => showError({ err }),
    args: [sesionId],
  });

  return {
    pedidos: data?.data?.pedidos,
    loading,
    fetchPedidos: refetch,
  }
}

export default usePedidos;