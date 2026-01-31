import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

const AddButton = ({ text = "Nuevo", onClick, ...props }) => {

  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => onClick?.()}
      {...props}
    >
      {text}
    </Button>
  );
}

export default AddButton;