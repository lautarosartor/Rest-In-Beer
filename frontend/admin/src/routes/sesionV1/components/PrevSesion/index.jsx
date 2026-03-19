import { Layout } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sesion from "routes/sesion";
import { getClientClaims } from "services/helpers";
import Checkout from "./Checkout";
import Identificate from "./Identificate";
import useSesion from "./useSesion";

const PrevSesion = () => {
  const { qr } = useParams();
  const storedClient = getClientClaims();

  const [openIdentificarse, setOpenIdentificarse] = useState(!storedClient?.dni);
  const [openCheckout, setOpenCheckout] = useState(!!storedClient?.dni);

  const {
    sesion,
    message200,
    message400,
    loading,
    fetchSesion,
  } = useSesion();

  // Si el backend dice que el cliente no existe → identificarse
  useEffect(() => {
    if (message400 === "Cliente no encontrado.") {
      setOpenIdentificarse(true);
      setOpenCheckout(false);
    }
  }, [message400]);

  // Cuando ya está identificado → buscar sesión
  useEffect(() => {
    if (!openIdentificarse && qr && storedClient?.dni) {
      fetchSesion(qr, storedClient?.dni);
    }
  }, [openIdentificarse, qr, storedClient]);

  // Cuando llega la sesión → abrir checkout
  useEffect(() => {
    if (sesion && !openIdentificarse) {
      setOpenCheckout(true);
    }
  }, [sesion, openIdentificarse]);

  return (
    <Layout
      style={{ minHeight: "100vh" }}
      className="fondo-sesion"
    >
      {openIdentificarse && (
        <Identificate
          onClose={() => setOpenIdentificarse(false)}
        />
      )}

      {openCheckout && (
        <Checkout
          sesion={sesion}
          message200={message200}
          message400={message400}
          loading={loading}
          onClose={() => setOpenCheckout(false)}
        />
      )}

      {!openIdentificarse && !openCheckout && sesion && (
        <Sesion
          sesion={sesion}
        />
      )}
    </Layout>
  );
};

export default PrevSesion;
