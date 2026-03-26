import SesionLayout from "components/layouts/sesion";
import { Navigate, useLocation } from "react-router-dom";
import { getClientToken } from "services/helpers";

const PrivateClientRoute = () => {
  // Aquí es donde comprobarías si el cliente está autenticado
  const location = useLocation();
  const isAuthenticated = getClientToken();

  // Si esta authenticado muestra los componentes, sino lo redirige a identificarse
  if (isAuthenticated) {
    return (
      <SesionLayout />
    )
  }
  else {
    return (
      <Navigate
        replace
        to="/sesion/auth"
        state={{ redirectTo: location }}
      />
    )
  }
};

export default PrivateClientRoute;