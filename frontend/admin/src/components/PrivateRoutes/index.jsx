import { Navigate } from "react-router-dom";
import MainLayout from "../../layouts/main";

const PrivateRoute = () => {
  // Aquí es donde comprobarías si el usuario está autenticado
  const isAuthenticated = localStorage.getItem("token");

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