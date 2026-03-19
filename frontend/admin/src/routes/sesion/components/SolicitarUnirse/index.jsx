import { Form, Modal, Typography } from "antd";
import { CANCEL } from "constants/index";

const SolicitarUnirse = ({ title, onClose }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={true}
      title={title}
      okText="Solicitar"
      onOk={() => form.submit()}
      onCancel={() => onClose(CANCEL)}
      // confirmLoading={create.loading}
    >
      <Typography.Text>
        Esta mesa ya tiene una sesión activa, solicitá acceso al siguiente link (proximamente)
      </Typography.Text> 
    </Modal>
  );
}

export default SolicitarUnirse;