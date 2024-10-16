import { useState } from "react"
import { api } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { Button, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const toast = useToast()
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.auth.login({
        email,
        password
      });

      if (response.status === "success") {
        // Guardamos el token en sessionStorage
        sessionStorage.setItem("token", response.data.token);
        
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
        position: 'bottom',
      })
    }
  }

  return (
    <main className="flex-grow flex container mx-auto">
      <form
        className="m-auto grid gap-6 p-6 border border-[#EFFFC8] rounded-xl shadow-xl shadow-[#85CB33]"
        onSubmit={handleLogin}
      >
        <Input
          type="email"
          placeholder='Email'
          isRequired
          variant='outline'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{color: '#A5CBC3'}}
        />

        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder='Contraseña'
            isRequired
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{color: '#A5CBC3'}}
          />
          <InputRightElement>
            <Button variant='none' onClick={() => setShow(!show)}>
              {show
                ? <ViewIcon  color='white' />
                : <ViewOffIcon  color='white' />
              }
            </Button>
          </InputRightElement>
        </InputGroup>
        
        <button
          className="p-2 rounded-lg bg-[#EFFFC8] hover:bg-[#85CB33] text-[#100B00] font-bold"
          type="submit"
        >
          Iniciar sesión
        </button>
      </form>
    </main>
  )
}

export default Login