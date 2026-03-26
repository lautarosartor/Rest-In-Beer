import useQuery from "hooks/useQuery";
import queryString from "query-string";
import { useCallback, useRef } from "react";
import { showError } from "utils";
import { searchProducts } from "./api";

const useSearchProductos = (onSelect) => {
  const debounceRef = useRef(null);

  const { data, loading, refetch } = useQuery({
    autoFetch: true,
    queryFn: searchProducts,
    onError: (err) => showError({ err }),
  });

   const handleSearch = useCallback((q) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q?.length > 1 && q?.length < 3) return;

    debounceRef.current = setTimeout(() => {
      const query = queryString.stringify({ q });
      refetch(query);
    }, 400);
  }, [refetch]);

  const handleSelect = (value, option) => {
    console.log("Producto seleccionado:", value, option.producto);
    onSelect?.(option.producto);
  };

  const productos = data?.data?.productos;
  const productosOptions = productos?.map((p) => ({
    value: p.id,
    label: p.nombre,
    producto: p,
  }));

  return {
    productos,
    productosOptions,
    loadingProductos: loading,
    handleSearch,
    handleSelect,
  }
}

export default useSearchProductos;