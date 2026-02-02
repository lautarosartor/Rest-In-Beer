import useQuery from "hooks/useQuery";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { showError } from "utils";
import { getPaginatedProducts } from "./api";

const useGetProductos = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChange: true,
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
    queryFn: getPaginatedProducts,
    onError: (err) => showError({ err }),
  });

  const fetchProductos = () => {
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
    fetchProductos();
  }, []);

  return {
    productos: data?.data?.productos,
    total: data?.data?.totalDataSize,
    loading,
    pagination,
    fetchProductos,
    onTableChange,
    onSearch,
  }
}

export default useGetProductos;