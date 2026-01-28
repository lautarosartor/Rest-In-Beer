import {
  BgColorsOutlined,
  BulbOutlined,
  CheckOutlined,
  CompressOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import { THEMES } from "constants/demoData";
import { useTheme } from "context/theme/useTheme";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  const THEME_OPTIONS = [
    { key: THEMES.SYSTEM, label: "Dispositivo", icon: <BgColorsOutlined /> },
    { key: THEMES.DEFAULT, label: "Claro", icon: <BulbOutlined /> },
    { key: THEMES.DARK, label: "Oscuro", icon: <MoonOutlined /> },
    { key: THEMES.COMPACT, label: "Compacto", icon: <CompressOutlined /> },
  ]

  const items = THEME_OPTIONS.map((item) => ({
    key: item.key,
    label: item.label,
    icon:
      theme === item.key
        ? <CheckOutlined />
        : item.icon,
  }));

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        selectedKeys: [String(theme)],
        onClick: ({ key }) => setTheme(Number(key)),
      }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <BgColorsOutlined style={{ fontSize: 18, cursor: "pointer" }} />
    </Dropdown>
  );
};

export default ThemeSelector;
