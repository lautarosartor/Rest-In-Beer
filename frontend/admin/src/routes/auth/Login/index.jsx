import { Button, Card, Flex, Form, Input } from "antd";
import Password from "antd/es/input/Password";
import fondoLogin from "assets/fondoLogin.png";
import { LABEL_ALIGN } from "constants/index";
import { useState } from "react";
import useLogin from "./useLogin";
import Mesas from "./components/Mesas";

const Login = () => {
  const [form] = Form.useForm();
  const [openMesas, setOpenMesas] = useState(false);
  const { loading, handleLogin } = useLogin();

  return (
    <Flex
      style={{
        height: '100vh',
        backgroundImage: `url(${fondoLogin})`,
      }}
    >
      <Card
        loading={loading}
        style={{
          width: 500,
          margin: 'auto'
        }}
      >
        <Form
          form={form}
          onFinish={handleLogin}
          labelAlign={LABEL_ALIGN}
          labelCol={{ flex: '100px' }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true }]}
          >
            <Password />
          </Form.Item>

          <Flex justify="space-between" gap={16}>
            <Button
              type="primary"
              htmlType="submit"
            >
              Iniciar Sesión
            </Button>
            
            <Button
              // color="secondary"
              onClick={() => setOpenMesas(true)}
            >
              Ver mesas
            </Button>
          </Flex>
        </Form>
      </Card>

      {openMesas &&
        <Mesas onClose={() => setOpenMesas(false)} />
      }
    </Flex>
  );
}

export default Login;