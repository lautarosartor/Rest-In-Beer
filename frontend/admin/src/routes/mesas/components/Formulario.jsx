import { Form, Input, InputNumber, Popover, QRCode } from "antd";
import TextArea from "antd/es/input/TextArea";
import { LABEL_ALIGN, RULE_REQUIRED } from "constants/index";
import { useEffect, useState } from "react";
import { config } from "services/config";

const Formulario = ({ form, onFinish, initialValues, loading }) => {
  const codigoQR = Form.useWatch("codigo_qr", form);
  const [viewQR, setViewQR] = useState(false);

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
      labelCol={{ span: 5 }}
      disabled={loading}
    >
      <Form.Item
        label="Nombre"
        name="nombre_mesa"
        rules={[RULE_REQUIRED]}
      >
        <Input
          placeholder="Nombre de la mesa"
        />
      </Form.Item>

      <Form.Item
        label="Capacidad"
        name="capacidad"
        rules={[RULE_REQUIRED]}
      >
        <InputNumber
          min={1}
          max={50}
          placeholder="Capacidad"
        />
      </Form.Item>

      <Form.Item
        label="Descripción"
        name="descripcion"
      >
        <TextArea
          autoSize={{ minRows: 1 }}
          placeholder="Descripción de la mesa"
        />
      </Form.Item>

      <Popover
        open={viewQR}
        placement="bottomLeft"
        content={
          <QRCode
            size={100}
            bordered={false}
            value={`${config.URL_BASE}/sesion/${codigoQR}`}
          />
        }
      >
        <Form.Item
          label="Código QR"
          name="codigo_qr"
          hidden={!initialValues}
        >
          <Input
            maxLength={10}
            onFocus={() => setViewQR(true)}
            onBlur={() => setViewQR(false)}
          />
        </Form.Item>
      </Popover>
    </Form>
  );
}

export default Formulario;