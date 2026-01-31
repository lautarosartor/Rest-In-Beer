import { Grid } from "antd";

export const CANCEL = "cancel";

export const LABEL_ALIGN = "left";

export const RULE_REQUIRED = {
  required: true,
  message: "Campo obligatorio"
};

export const useIsMobile = () => {
  const screens = Grid.useBreakpoint();
  return screens.xs;
};
