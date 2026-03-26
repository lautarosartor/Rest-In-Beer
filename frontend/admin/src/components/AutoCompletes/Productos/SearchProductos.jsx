import { Select } from "antd";
import useSearchProductos from "./useSearchProductos";

const SearchProductos = ({ onSelect, ...props }) => {
  const { productosOptions, loadingProductos, handleSearch, handleSelect } = useSearchProductos(onSelect);

  return (
    <Select
      showSearch={{
        filterOption: false,
        onSearch: handleSearch,
      }}
      allowClear
      placeholder="Buscar producto..."
      onSelect={handleSelect}
      loading={loadingProductos}
      options={productosOptions}
      style={{ width: "100%" }}
      maxTagCount={props.maxTagCount ?? "responsive"}
      {...props}
    />
  );
};

export default SearchProductos;