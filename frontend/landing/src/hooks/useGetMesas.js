import useQuery from "hooks/useQuery";
import { getAllTables } from "../views/private/mesas/api";
import { showSuccessToastify } from "utils";
import queryString from "query-string";
import { useEffect } from "react";

const useGetMesas = (mesaQR) => {
  const { data, loading, refetch } = useQuery({
    autoFetch: false,
    queryFn: getAllTables,
    onError: (err) => showSuccessToastify({ err }),
  });

  const fetch = () => {
    const query = queryString.stringify({
      mesa: mesaQR
    });
    refetch(query);
  }

  useEffect(() => {
    fetch();
  }, []);

  return {
    mesas: data?.data?.mesas,
    total: data?.data?.totalDataSize,
    loading,
    fetchMesas: refetch,
  }
}

export default useGetMesas;