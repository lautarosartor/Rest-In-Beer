import useQuery from "hooks/useQuery";
import { showError } from "utils";
import { getAllTables } from "./api";

const useGetMesas = () => {
  const { data, loading, refetch } = useQuery({
    autoFetch: true,
    queryFn: getAllTables,
    onError: (err) => showError({ err }),
  });

  return {
    mesas: data?.data?.mesas,
    total: data?.data?.totalDataSize,
    loading,
    fetchMesas: refetch,
  }
}

export default useGetMesas;