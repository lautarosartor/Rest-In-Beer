import { Menu as AntMenu } from "antd";
import { iconMap } from "components/DynamicIcon";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import menu from "./menu.json";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mapMenuItems = (items) => (
    items.map((item) => ({
      key: item.path,
      label: item.item,
      type: item.type,
      icon: item.icon ? React.createElement(iconMap[item.icon]) : null,
      children: item.children ? mapMenuItems(item.children) : undefined,
      hidden: item.hidden,
    })).filter(i => !i.hidden)
  );

  const menuStyle = {
    borderInlineEnd: 0,
    height: '100%',
  }

  return (
    <AntMenu
      mode="inline"
      triggerSubMenuAction="click"
      selectedKeys={[location.pathname]}
      items={mapMenuItems(menu)}
      onClick={({ key }) => navigate(key)}
      style={menuStyle}
    />
  );
}

export default Menu;