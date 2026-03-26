import { Layout } from "antd";
import ThemeSelector from "components/ThemeSelector";
import Logo from "./Logo";

const Header = ({ collapsed, ...props }) => {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 16px',
    ...props.style
  };
 
  return (
    <Layout.Header style={headerStyle}>
      <Logo collapsed={collapsed} />
      <ThemeSelector />
    </Layout.Header>
  );
}

export default Header;