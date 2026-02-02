import { Form, message, Modal } from "antd";
import { CANCEL } from "constants/index";
import useMutation from "hooks/useMutation";
import { showError } from "utils";
import { createProduct } from "../api";
import Formulario from "./Formulario";

const Nuevo = ({ onClose }) => {
  const [form] = Form.useForm();

  const create = useMutation({
    mutationFn: createProduct,
    onSuccess: (res) => {
      message.success(res.message);
      onClose();
    },
    onError: (err) => showError({ err }),
  });

  const handleCreate = (values) => {
    create.mutate(values);
  }

  return (
    <Modal
      open={true}
      title="Crear producto"
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