import { Flex, Form, Input, Modal, Typography, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useMutation from "hooks/useMutation";
import { showError } from "utils";
import { createClient } from "./api";
import { RULE_REQUIRED } from "constants/index";

const Identificate = ({ onClose }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [color, setColor] = useState("#DDFFAA");
  const dni = Form.useWatch("dni", form);
  const nombre = Form.useWatch("nombre", form);
  const apellido = Form.useWatch("apellido", form);

  const create = useMutation({
    mutationFn: createClient,
    onSuccess: (res) => {
      localStorage.setItem("dni", dni);
      localStorage.setItem("cliente", `${nombre} ${apellido}`);
      localStorage.setItem("color", color);

      message.success(`${nombre}, ${res.message}`);

      setTimeout(() => {
        onClose();
      }, 700);
    },
    onError: (err) => showError({ err }),
  });

  const handleSave = (values) => {
    create.mutate(values);
  };

  return (
    <Modal
      open={true}
      title="Identificate"
      okText="Confirmar"
      cancelText="Volver"
      onOk={() => form.submit()}
      onCancel={() => {
        onClose();
        navigate(-1);
      }}
      confirmLoading={create.isLoading}
      closable={false}
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        autoComplete="off"
      >
        <Flex wrap="wrap" gap={16}>
          <Form.Item
            name="nombre"
            label="Nombre"
            rules={[RULE_REQUIRED]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Nombre"  />
          </Form.Item>

          <Form.Item
            name="apellido"
            label="Apellido"
            rules={[RULE_REQUIRED]}
            style={{ flex: 1 }}
          >
            <Input placeholder="Apellido" />
          </Form.Item>
        </Flex>

        <Form.Item
          label="Documento"
          name="dni"
          rules={[RULE_REQUIRED]}
        >
          <Input placeholder="DNI" />
        </Form.Item>

        <Form.Item label="Elegí tu color">
          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: 80, padding: 0 }}
          />
        </Form.Item>

        <Typography.Text
          type="secondary"
          style={{ display: "block", textAlign: "center" }}
        >
          Estos datos usaremos para identificarte
        </Typography.Text>
      </Form>
    </Modal>
  );
};

export default Identificate;