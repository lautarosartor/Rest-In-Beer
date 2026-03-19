import { Modal, Spin, Typography } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showError } from "utils";

const Checkout = ({
  onClose,
  sesion,
  message200,
  message400,
  loading,
}) => {
  const navigate = useNavigate();
  const sesionID = localStorage.getItem("sesionID");

  const handleFinish = () => {
    if (!sesion && !message400) {
      showError({ err: "La sesión no se ha podido crear. Inténtalo de nuevo más tarde." });
      return;
    }

    onClose();
  };

  useEffect(() => {
    if (!sesion?.id) return;

    if (sesionID !== String(sesion.id)) {
      localStorage.setItem("sesionID", sesion.id);
    }

    onClose();
  }, [sesion?.id]);

    return (
    <Modal
      open
      title="A un paso de entrar"
      okText="Crear sesión"
      cancelText="Volver"
      onCancel={() => {
        onClose();
        navigate(-1);
      }}
      onOk={!message400 ? handleFinish : undefined}
      confirmLoading={loading}
      closable={false}
      maskClosable={false}
    >
      {!sesion && !message400 && message200 && (
        <Typography.Text>{message200}</Typography.Text>
      )}

      {message400 ? (
        <Typography.Text type="danger">
          {message400}
        </Typography.Text>
      ) : (
        !message200 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Typography.Text>Entrando...</Typography.Text>
            <Spin size="small" />
          </div>
        )
      )}
    </Modal>
  );
};

export default Checkout;