import { Layout } from "antd";
import Menu from "./Menu";

const Sider = ({ collapsed, setCollapsed }) => {
  return (
    <Layout.Sider
      collapsed={collapsed}
      onCollapse={setCollapsed}
      breakpoint="md"
      width={240}
    >
      <Menu />
    </Layout.Sider>
  );
}

export default Sider;