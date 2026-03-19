import useQuery from "hooks/useQuery";
import queryString from "query-string";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { showError } from "utils";
import { getSesion } from "./api";

const useGetSesion = () => {
  const { qr } = useParams();

  const { data, refetch, loading } = useQuery({
    autoFetch: false,
    queryFn: getSesion,
    onError: (err) => showError({ err }),
  });

  const fetchSesion = (mesaQR) => {
    const query = queryString.stringify({
      mesa: mesaQR ?? qr,
    });

    refetch(query);
  }

  useEffect(() => {
    if (!qr) return;
    fetchSesion(qr);
  }, [qr]);

  return {
    sesion: data?.data?.sesion,
    code: data?.code,
    descriptionCode: data?.message,
    loadingSesion: loading,
    fetchSesion,
  }
}

export default useGetSesion;