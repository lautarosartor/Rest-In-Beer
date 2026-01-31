import { Form, message, Modal } from "antd";
import { CANCEL } from "constants/index";
import useMutation from "hooks/useMutation";
import { updateTable } from "../api";
import Formulario from "./Formulario";

const Editar = ({ mesa, onClose }) => {
  const [form] = Form.useForm();

  const update = useMutation({
    mutationFn: updateTable,
    onSuccess: (res) => {
      message.success(res.message);
      onClose?.();
    }
  });

  const handleUpdate = (values) => {
    update.mutate(mesa?.id, values);
  }

  return (
    <Modal
      open={true}
      title={`Editar mesa #${mesa.nombre_mesa}`}
      okText="Guardar"
      onOk={() => form.submit()}
      onCancel={() => onClose(CANCEL)}
      confirmLoading={update.loading}
      okButtonProps={{ disabled: mesa?.ocupada }}
    >
      <Formulario
        form={form}
        onFinish={handleUpdate}
        initialValues={mesa}
        loading={update.loading}
      />
    </Modal>
  );
}

export default Editar;