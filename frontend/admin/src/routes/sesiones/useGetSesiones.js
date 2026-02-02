import useQuery from "hooks/useQuery";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { getPaginatedSesiones } from "./api";

const useGetSesiones = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
  });
  const [sorting, setSorting] = useState({
    field: "",
    order: ""
  });

  const onTableChange = (pagination, _, sorting) => {
    setPagination(ps => ({ ...ps, ...pagination }))
    setSorting(sorting)
  };
  
  const onSearch = (searchValue, searchedColumn) => {
    setPagination(prevPagination => ({ ...prevPagination, current: 1 }));
    setSearchValue(searchValue);
    setSearchedColumn(searchedColumn);
  }

  const { data, loading, refetch } = useQuery({
    autoFetch: false,
    queryFn: getPaginatedSesiones,
  });

  const fetchSesiones = () => {
    const query = queryString.stringify({
      limit: pagination.pageSize,
      page: pagination.current,
      sortField: sorting.field,
      sortOrder: sorting.order === "ascend" ? "ASC" : "DESC",
      searchValue,
      searchedColumn,
    });
    refetch(query);
  }

  useEffect(() => {
    fetchSesiones();
  }, []);

  return {
    sesiones: data?.data?.sesiones,
    total: data?.data?.totalDataSize,
    loading,
    pagination,
    fetchSesiones,
    onTableChange,
    onSearch,
  };
}

export default useGetSesiones;