import { Form, message, Modal } from "antd";
import { CANCEL } from "constants/index";
import useMutation from "hooks/useMutation";
import { createTable } from "../api";
import Formulario from "./Formulario";

const Nuevo = ({ onClose }) => {
  const [form] = Form.useForm();

  const create = useMutation({
    mutationFn: createTable,
    onSuccess: (res) => {
      message.success(res.message);
      onClose?.();
    }
  });

  const handleCreate = (values) => {
    create.mutate(values);
  }

  return (
    <Modal
      open={true}
      title="Crear mesa"
      okText="Crear"
      onOk={() => form.submit()}
      onCancel={() => onClose(CANCEL)}
      confirmLoading={create.loading}
    >
      <Formulario
        form={form}
        onFinish={handleCreate}
        loading={create.loading}
      />
    </Modal>
  );
}

export default Nuevo;