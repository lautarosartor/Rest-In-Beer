import useQuery from "hooks/useQuery";
import { getSesion } from "./api";
import queryString from "query-string";
import { showErrorToastify } from "utils";
import { useToast } from "@chakra-ui/react";

const useSesion = () => {
  const toast = useToast();
  const { data, refetch, loading, error } = useQuery({
    autoFetch: false,
    queryFn: getSesion,
    onError: (err) => showErrorToastify({ toast, err }),
  });

  const fetch = (mesaQR, clienteDni) => {
    const query = queryString.stringify({
      mesa: mesaQR,
      dni: clienteDni,
    });

    refetch(query);
  }

  return {
    sesion: data?.data?.sesion,
    message200: data?.message,
    message400: error?.message,
    loading,
    fetchSesion: fetch,
  }
}

export default useSesion;