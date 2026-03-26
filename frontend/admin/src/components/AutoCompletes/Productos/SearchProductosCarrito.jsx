import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Image, Select, Typography } from "antd";
import { formatCurrency } from "utils";
import useSearchProductos from "./useSearchProductos";

const SearchProductosCarrito = ({ onSelect, agregados = {}, ...props }) => {
  const { productosOptions, loadingProductos, handleSearch, handleSelect } = useSearchProductos(onSelect);

  return (
    <Select
      showSearch={{
        filterOption: false,
        onSearch: handleSearch,
      }}
      allowClear
      placeholder="Buscar producto..."
      loading={loadingProductos}
      options={productosOptions}
      style={{ width: "100%" }}
      maxTagCount={props.maxTagCount ?? "responsive"}
      open={undefined} // controlado por Ant Design normalmente
      optionRender={(oriOption) => {
        const option = oriOption?.data;
        const producto = option?.producto;
        const yaAgregado = !!agregados[producto?.id];

        return (
          <Flex
            align="center"
            gap={10}
            style={{ cursor: 'default' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={producto?.img_url}
              width={36}
              height={36}
              preview={false}
              style={{
                borderRadius: 6,
                objectFit: "cover",
                flexShrink: 0,
              }}
            />

            <Flex vertical style={{ flex: 1 }}>
              <Typography.Text>
                {producto?.nombre}
              </Typography.Text>
              <Typography.Text
                type="secondary"
                style={{ fontSize: 11 }}
              >
                {formatCurrency(producto?.precio)}
              </Typography.Text>
            </Flex>

            <Button
              size="small"
              type="text"
              disabled={yaAgregado}
              icon={yaAgregado ? <CheckOutlined /> : <PlusOutlined/>}
              style={{
                fontSize: 12,
                color: yaAgregado
                ? undefined
                : "#009C63",
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!yaAgregado) handleSelect(option?.value, option);
              }}
            >
              {!yaAgregado && "Agregar"}
            </Button>
          </Flex>
        );
      }}
      {...props}
    />
  );
};

export default SearchProductosCarrito;