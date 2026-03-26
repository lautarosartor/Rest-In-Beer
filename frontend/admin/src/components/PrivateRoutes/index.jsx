import MainLayout from "components/layouts/main";
import { Navigate } from "react-router-dom";
import { getToken } from "services/helpers";

const PrivateRoute = () => {
  // Aquí es donde comprobarías si el usuario está autenticado
  const isAuthenticated = getToken();

  // Si esta authenticado muestra los componentes, sino lo redirige a logearse
  if (isAuthenticated) {
    return (
      <MainLayout />
    )
  }
  else {
    return <Navigate to="/login" />
  }
};

export default PrivateRoute;