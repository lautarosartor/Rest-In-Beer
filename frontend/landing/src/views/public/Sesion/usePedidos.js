import useQuery from "hooks/useQuery";
import { getSesionPedidos } from "./api";
import { useToast } from "@chakra-ui/react";
import { showErrorToastify } from "utils";

const usePedidos = (sesionId) => {
  const toast = useToast();

  const { data, refetch, loading } = useQuery({
    autoFetch: false,
    queryFn: getSesionPedidos,
    onError: (err) => showErrorToastify({ toast, err }),
    args: [sesionId],
  });

  return {
    pedidos: data?.data?.pedidos,
    loading,
    fetchPedidos: refetch,
  }
}

export default usePedidos;