import { Button, Card, Flex, Form, Input } from "antd";
import Password from "antd/es/input/Password";
import { LABEL_ALIGN } from "constants/index";
import useLogin from "./useLogin";
import fondoLogin from "assets/fondoLogin.png";

const Login = () => {
  const [form] = Form.useForm();
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

          <Form.Item
            noStyle
          >
            <Button
              type="primary"
              htmlType="submit"
            >
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
}

export default Login;