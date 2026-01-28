import { Layout } from "antd";

const Footer = () => {
  const footerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 16px',
    height: 48,
  };

  return (
    <Layout.Footer style={footerStyle}>
      ©{new Date().getFullYear()} Created by Sartoru Gojo
    </Layout.Footer>
  );
}

export default Footer;