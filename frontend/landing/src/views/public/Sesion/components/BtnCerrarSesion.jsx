import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useSesion from "../PrevSesion/useSesion";

function BtnCerrarSesion() {
  const { deleteSesion } = useSesion();
  const navigate = useNavigate();
  
  const handleCloseSesion = async () => {
    const sesionID = localStorage.getItem("sesionID");

    if (sesionID) {
      // Mostrar mensaje de confirmacion
      const confirmacion = window.confirm("¿Estás seguro de que deseas cerrar sesión?")
    
      if (confirmacion) {
        await deleteSesion(sesionID)
        navigate("/");
      }
    }
    else {
      console.log("error");
    }
  }

  return (
    <Button
      variant="outline"
      colorScheme="red"
      onClick={() => handleCloseSesion()}
      sx={{
        "&:hover": {
          backgroundColor: '#BB2124',
          color: '#fff'
        }
      }}
    >
      Cerrar la sesión
    </Button>
  )
}

export default BtnCerrarSesion