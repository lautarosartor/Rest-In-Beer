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
      ©{new Date().getFullYear()} Desarrollado por Lautaro Sartor
    </Layout.Footer>
  );
}

export default Footer;