import { Button, Flex, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import useGetMesas from "routes/mesas/useGetMesas";

const Mesas = ({ onClose }) => {
  const navigate = useNavigate();
  const { mesas, loading } = useGetMesas(); 

  return (
    <Modal
      open={true}
      title="Mesas"
      cancelText="Cerrar"
      onCancel={onClose}
      loading={loading}
      footer={(_, { CancelBtn }) => <CancelBtn />}
    >
      <Flex vertical gap={4}>
        {mesas?.map((mesa) => (
          <Button
            key={mesa.id}
            block
            variant="filled"
            color={mesa.ocupada ? "danger" : "primary"}
            onClick={() => navigate(`/mesa/${mesa.codigo_qr}`)}
          >
            {mesa.nombre}
          </Button>
        ))}
      </Flex>
    </Modal>
  );
}

export default Mesas;