import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  // Aquí es donde comprobarías si el usuario está autenticado
  const isAuthenticated = localStorage.getItem("token");

  // Si esta authenticado muestra los componentes, sino lo redirige a logearse
  if (isAuthenticated) {
    return (
      <Navbar>{children}</Navbar>
    )
  }
  else {
    return <Navigate to="/login" />
  }
};

// Validacion de props
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;