import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import useStyles from "hooks/useStyles";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sider from "./components/Sider";

const MainLayout = () => {
  const { headerBg } = useStyles();
  const [collapsed, setCollapsed] = useState(false);

  const contentStyle = {
    margin: 16,
    marginBottom: 0,
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        collapsed={collapsed}
        style={{ background: headerBg }}
      />
      <Layout>
        <Sider
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
}

export default MainLayout;