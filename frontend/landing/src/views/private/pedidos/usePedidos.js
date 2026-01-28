import { useEffect, useState } from "react";
import queryString from 'query-string'
import useQuery from "hooks/useQuery";
import { getAllOrders } from "./api";
import { showErrorToastify } from "utils";
import { useToast } from "@chakra-ui/react";

const usePedidos = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    showSizeChanger: true
  });
  const [sorting, setSorting] = useState({
    field: "",
    order: ""
  });
  const toast = useToast();

  const { data, loading, refetch } = useQuery({
    autoFetch: false,
    queryFn: getAllOrders,
    onError: (err) => showErrorToastify({ toast, err }),
  });

  const fetch = () => {
    const query = queryString.stringify({
      limit: pagination.pageSize,
      page: pagination.current,
      sortField: sorting.field,
      sortOrder: sorting.order === "ascend" ? "ASC" : "DESC",
    });

    refetch(query);
  }

  const onTableChange = (pagination, _, sorting) => {
    setPagination(ps => ({ ...ps, ...pagination }))
    setSorting(sorting)
  };

  useEffect(() => {
    fetch();
  }, [pagination, sorting]);

  return {
    pedidos: data?.data?.pedidos,
    total: data?.data?.totalDataSize,
    loading,
    fetchPedidos: fetch,
    onTableChange,
  }
}

export default usePedidos;