import { useEffect, useState } from "react";
import useQuery from "hooks/useQuery";
import queryString from "query-string";
import { getAllSesiones } from "./api";
import { showErrorToastify } from "utils";
import { useToast } from "@chakra-ui/react";

const useSesiones = (activas) => {
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
    queryFn: getAllSesiones,
    onError: (err) => showErrorToastify({ toast, err }),
  });

  const fetch = (activas) => {
    const query = queryString.stringify({
      limit: pagination.pageSize,
      page: pagination.current,
      sortField: sorting.field,
      sortOrder: sorting.order === "ascend" ? "ASC" : "DESC",
      activas,
    });

    refetch(query);
  }

  const onTableChange = (pagination, _, sorting) => {
    setPagination(ps => ({ ...ps, ...pagination }))
    setSorting(sorting)
  };

  useEffect(() => {
    fetch(activas);
  }, [pagination, sorting]);

  return {
    sesiones: data?.data?.sesiones,
    total: data?.data?.totalDataSize,
    loading,
    fetchSesiones: fetch,
    onTableChange,
  }
}

export default useSesiones;