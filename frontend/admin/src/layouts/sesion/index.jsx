import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import fondoLogin from "assets/fondoLogin.png";
import { Outlet } from "react-router-dom";

const SesionLayout = () => {
  return (
    <Layout
      style={{
        height: '100vh',
        backgroundImage: `url(${fondoLogin})`,
      }}
    >
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}

export default SesionLayout;