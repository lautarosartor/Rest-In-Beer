import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Identificate from "./Identificate";
import Checkout from "./Checkout";
import Sesion from "..";
import useSesion from "./useSesion";

const PrevSesion = () => {
  const param = useParams();
  const storedDNI = localStorage.getItem("dni");
  const [openIdentificarse, setOpenIdentificarse] = useState(!storedDNI);
  const [openCheckout, setOpenCheckout] = useState(!openIdentificarse);
  const { sesion, message200, message400, loading, fetchSesion } = useSesion();

  useEffect(() => {
    if (message400 === "Cliente no encontrado.") {
      setOpenIdentificarse(true);
    }
  }, [message400]);

  useEffect(() => {
    if (!openIdentificarse) {
      fetchSesion(param?.qr, storedDNI);
      setOpenCheckout(true);
    }
  }, [openIdentificarse, param?.qr, storedDNI]);
  
  return (
    <Box minH="100vh" className="fondo-sesion">
      {openIdentificarse &&
        <Identificate
          closeModal={() => {
            setOpenIdentificarse(false);
          }}
        />
      }

      {openCheckout &&
        <Checkout
          sesion={sesion}
          message200={message200}
          message400={message400}
          loading={loading}
          closeModal={() => setOpenCheckout(false)}
        />
      }

      {!openIdentificarse && !openCheckout &&
        <Sesion
          sesion={sesion}
        />
      }
    </Box>
  );
}

export default PrevSesion;