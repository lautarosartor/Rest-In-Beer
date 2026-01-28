import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../services/api";

const RegisterPage = () => {
  const [idrol, setIdRol] = useState(0);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password != confirmPass) {
      toast({
        title: "Las contraseñas no coinciden.",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    }
    
    try {
      const response = await api.auth.register({
        idrol,
        nombre,
        apellido,
        email,
        password
      });

      if (response.status === "success") {
        // Guardamos el token en sessionStorage
        localStorage.setItem("token", response.data.token);
        
        navigate("/admin/dashboard");
      }
      else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  return (
    <main className="flex-grow flex container mx-auto">
      <form
        className="m-auto grid gap-6 p-6 border border-[#85CB33] rounded-xl shadow-xl shadow-[#85CB33]"
        onSubmit={handleRegister}
      >
        <div className="flex gap-6">
          <input
            className="capitalize p-3 rounded-xl"
            type="text"
            placeholder="Nombre"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            className="capitalize p-3 rounded-xl"
            type="text"
            placeholder="Apellido"
            required
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>

        <div className="grid gap-6">
          <input
            className="p-3 rounded-xl"
            type="Email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex gap-6">
            <input
              className="p-3 rounded-xl w-full"
              type="number"
              placeholder="Rol"
              disabled
              value={idrol}
              onChange={(e) => setIdRol(e.target.value)}
            />
            <input
              className="p-3 rounded-xl w-full"
              type="date"
              disabled
            />
          </div>
        </div>

        <div className="flex gap-6">
          <input
            className="p-3 rounded-xl"
            type="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="p-3 rounded-xl"
            type="password"
            placeholder="Confirmar contraseña"
            required
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>
        
        <button className="p-3 rounded-xl bg-[#ffffff42] hover:bg-[#EFFFC8] text-[#85CB33] hover:text-[#100B00] font-bold" type="submit">
          Registrarse
        </button>
      </form>
    </main>
  )
}

export default RegisterPage