import useQuery from "hooks/useQuery";
import queryString from "query-string";
import { showError } from "utils";
import { getSesion } from "./api";

const useSesion = () => {
  const { data, refetch, loading, error } = useQuery({
    autoFetch: false,
    queryFn: getSesion,
    onError: (err) => showError({ err }),
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