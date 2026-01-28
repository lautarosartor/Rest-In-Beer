import { useToast } from "@chakra-ui/react";
import useQuery from "hooks/useQuery";
import { useEffect } from "react";
import { showErrorToastify } from "utils";
import { getAllUsers } from "../api";

const useGetUsuarios = () => {
  const toast = useToast();

  const { data, loading, refetch } = useQuery({
    autoFetch: false,
    queryFn: getAllUsers,
    onError: (err) => showErrorToastify({ toast, err }),
  });

  const fetch = () => {
    refetch();
  }

  useEffect(() => {
    fetch();
  }, []);

  return {
    usuarios: data?.data?.usuarios,
    loadingUsuarios: loading,
    getUsuarios: fetch,
  }
}

export default useGetUsuarios;