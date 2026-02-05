import usePersistedFilters from "hooks/usePersistedFilters";
import useQuery from "hooks/useQuery";
import queryString from "query-string";
import { useMemo } from "react";
import { showError } from "utils";
import { getPaginatedSesiones } from "./api";

const useGetSesiones = () => {
  const {
    filters,
    onTableChange,
    onSearch,
  } = usePersistedFilters("sesiones.filters");

  const { pagination, sorting, searchValue, searchedColumn } = filters;

  const query = useMemo(() => {
    return queryString.stringify({
      limit: pagination?.pageSize,
      page: pagination?.current,
      sortField: sorting?.field,
      sortOrder: sorting?.order === "ascend" ? "ASC" : "DESC",
      searchValue,
      searchedColumn,
    });
  }, [pagination, sorting, searchValue, searchedColumn]);

  const { data, loading } = useQuery({
    autoFetch: true,
    queryFn: getPaginatedSesiones,
    args: [query],
    onError: (err) => showError({ err }),
  });

  return {
    sesiones: data?.data?.sesiones,
    total: data?.data?.totalDataSize,
    loading,
    pagination,
    onTableChange,
    onSearch,
  };
}

export default useGetSesiones;