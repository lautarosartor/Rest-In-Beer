import { getAllSubcategories } from "services/api";
import { showError } from "utils";
import useQuery from "./useQuery";

const useGetAllSubcategorias = () => {
  const { data, loading, refetch } = useQuery({
    autoFetch: true,
    queryFn: getAllSubcategories,
    onError: (err) => showError({ err }),
  });

  const subcategorias = data?.data?.subcategorias;
  const subcategoriasOptions = subcategorias?.map(s => ({
    value: s.id,
    label: s.nombre,
  }));

  return {
    subcategorias,
    subcategoriasOptions,
    loadingSubcategorias: loading,
    fetchSubcategorias: refetch,
  }
}

export default useGetAllSubcategorias;