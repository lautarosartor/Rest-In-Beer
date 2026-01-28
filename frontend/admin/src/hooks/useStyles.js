import { theme } from "antd";

const useStyles = () => {
  const { token } = theme.useToken();

  return {
    ...token,
    // panel estándar ERP
    panelStyle: {
      marginBottom: 10,
      background: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      border: "none",
    },
  };
};

export default useStyles;
