import { RedoOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, message, Typography } from "antd";
import fondoLogin from "assets/fondoLogin.png";
import { RULE_REQUIRED } from "constants/index";
import useMutation from "hooks/useMutation";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getClientToken } from "services/helpers";
import { randomColor, showError } from "utils";
import { createClient } from "./api";

const Identify = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.redirectTo || "/";

  const create = useMutation({
    mutationFn: createClient,
    onSuccess: (res) => {
      localStorage.setItem("client_token", res?.data?.client_token);
      message.success(res.message);
      navigate(redirectTo);
    },
    onError: (err) => showError({ err }),
  });

  const onFinish = (values) => {
    create.mutate(values);
  }

  useEffect(() => {
    if (getClientToken()) {
      navigate(redirectTo);
    }
  }, []);

  return (
    <Flex
      style={{
        height: '100vh',
        backgroundImage: `url(${fondoLogin})`,
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{ color: randomColor() }}
        style={{
          width: 500,
          margin: 'auto'
        }}
      >
        <Card
          title="Identificate"
          loading={create.loading}
          actions={[
            <Button
              key="volver"
              variant="link"
              color="danger"
              block
              onClick={() => navigate(-1)}
            >
              Volver
            </Button>,
            <Button
              key="identificarme"
              variant="link"
              color="primary"
              block
              htmlType="submit"
            >
              Identificarme
            </Button>,
          ]}
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

          <Flex wrap="wrap" gap={16}>
            <Form.Item
              label="Documento"
              name="dni"
              rules={[RULE_REQUIRED]}
              style={{ flex: 1 }}
            >
              <Input placeholder="DNI" />
            </Form.Item>

            <Form.Item
              label="Color"
              tooltip="Color que te identifica"
            >
              <Flex align="center" gap={4}>
                <Form.Item
                  name="color"
                  noStyle
                >
                  <Input
                    type="color"
                    style={{ width: 80, padding: 0 }}
                  />
                </Form.Item>

                <Button
                  size="small"
                  type="text"
                  icon={<RedoOutlined />}
                  onClick={() => {
                    form.setFieldValue("color", randomColor());
                  }}
                />
              </Flex>
            </Form.Item>
          </Flex>

          <Typography.Text
            type="secondary"
            style={{
              display: "block",
              textAlign: "center",
              fontSize: '12px'
            }}
          >
            Estos datos usaremos para identificarte
          </Typography.Text>
        </Card>
      </Form>
    </Flex>
  );
}

export default Identify;