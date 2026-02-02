import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import InputCurrency from "components/Inputs/InputCurrency";
import { LABEL_ALIGN, RULE_REQUIRED } from "constants/index";
import useGetAllSubcategorias from "hooks/useGetAllSubcategorias";
import { useEffect } from "react";
import { filterOption } from "utils";

const Formulario = ({ form, onFinish, initialValues, loading }) => {
  const { subcategoriasOptions, loadingSubcategorias } = useGetAllSubcategorias();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelAlign={LABEL_ALIGN}
      labelCol={{ span: 6 }}
      disabled={loading}
    >
      <Form.Item
        label="Nombre"
        name="nombre"
        rules={[RULE_REQUIRED]}
      >
        <Input
          placeholder="Nombre del producto"
        />
      </Form.Item>

      <Form.Item
        label="Subcategoría"
        name="subcategoria_id"
        rules={[RULE_REQUIRED]}
      >
        <Select
          allowClear
          loading={loadingSubcategorias}
          options={subcategoriasOptions}
          showSearch={{filterOption}}
          placeholder="Seleccioná la subcategoría"
        />
      </Form.Item>
      
      <Form.Item
        label="Precio"
        name="precio"
      >
        <InputCurrency />
      </Form.Item>

      <Form.Item
        label="Descripción"
        name="descripcion"
      >
        <TextArea
          autoSize={{ minRows: 1 }}
          placeholder="Descripción del producto"
        />
      </Form.Item>

      <Form.Item
        label="Imagen URL"
        name="img_url"
      >
        <Input
          placeholder="URL de la imágen"
        />
      </Form.Item>
    </Form>
  );
}

export default Formulario;