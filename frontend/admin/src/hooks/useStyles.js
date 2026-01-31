import { theme } from "antd";
import { useIsMobile } from "constants/index";

const useStyles = () => {
  const { token } = theme.useToken();
  const isMobile = useIsMobile();

  return {
    ...token,
    wrapperStyles: {
      margin: `
        ${token.marginSM}px
        ${isMobile ? 0 : token.marginSM}px
      `,
    },
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
