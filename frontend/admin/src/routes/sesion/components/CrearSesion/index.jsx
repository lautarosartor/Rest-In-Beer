import { Modal } from "antd";
import Typography from "antd/es/typography/Typography";
import { CANCEL } from "constants/index";
import useSesion from "./useSesion";

const CrearSesion = ({ title, onClose }) => {
  const { handleCreateSesion, loadingCreate } = useSesion(onClose);

  return (
    <Modal
      open={true}
      title={title}
      okText="Crear"
      closable={false}
      onOk={handleCreateSesion}
      onCancel={() => onClose(CANCEL)}
      confirmLoading={loadingCreate}
    >
      <Typography.Text>
        Creá una sesión e invitá a tus amigos
      </Typography.Text> 
    </Modal>
  );
}

export default CrearSesion;