import { Typography } from "antd";

const Logo = ({ collapsed }) => {

  return (
    <Typography.Title
      level={4}
      style={{
        margin: 0,
        padding: 16,
        textAlign: collapsed ? 'center' : 'start',
      }}
    >
      {collapsed ? "ERP" : "ERP System"}
    </Typography.Title>
  );
}

export default Logo;