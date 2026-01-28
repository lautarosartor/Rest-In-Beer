import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const NotFound = ({
  tipo = 1,
  message = "Página no encontrada",
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center align-center gap-10">
      {tipo === 1
        ? <img src="/src/assets/notfound.png" alt="404" className="mx-auto" style={{height: '20vw'}}/>
        : <img src="/src/assets/notfound2.png" alt="404" className="mx-auto" style={{height: '20vw'}}/>
      }
      <p className={`text-[${tipo === 1 ? '#fff' : '#000'}] text-center text-wrap`}>
        {message}
      </p>
      {tipo === 1 &&
        <Button
          onClick={() => navigate("/")}
          className="text-center self-center py-2 px-4 rounded-xl"
          backgroundColor="#85CB33"
        >
          Volver
        </Button>
      }
    </div>
  )
}

// Validacion de props
NotFound.propTypes = {
  tipo: PropTypes.number,
  message: PropTypes.string,
  height: PropTypes.string || PropTypes.number,
};

export default NotFound;