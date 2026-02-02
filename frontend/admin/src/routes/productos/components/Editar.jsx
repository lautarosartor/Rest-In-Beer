import { Form, message, Modal } from "antd";
import { CANCEL } from "constants/index";
import useMutation from "hooks/useMutation";
import { showError } from "utils";
import { updateProduct } from "../api";
import Formulario from "./Formulario";

const Editar = ({ producto, onClose }) => {
  const [form] = Form.useForm();

  const update = useMutation({
    mutationFn: updateProduct,
    onSuccess: (res) => {
      message.success(res.message);
      onClose();
    },
    onError: (err) => showError({ err }),
  });

  const handleUpdate = (values) => {
    update.mutate(producto?.id, values);
  }

  return (
    <Modal
      open={true}
      title={`Editar producto #${producto.nombre}`}
      okText="Guardar"
      onOk={() => form.submit()}
      onCancel={() => onClose(CANCEL)}
      confirmLoading={update.loading}
    >
      <Formulario
        form={form}
        onFinish={handleUpdate}
        initialValues={producto}
        loading={update.loading}
      />
    </Modal>
  );
}

export default Editar;