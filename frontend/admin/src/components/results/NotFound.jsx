import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Disculpa, la pagina que buscás no existe."
      extra={
        <Button
          type="primary"
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>
      }
    />
  );
}

export default NotFound;