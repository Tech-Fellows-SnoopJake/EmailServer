// src/Login.tsx
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
interface LoginProps {
  onLoginSuccess: () => void;
}
const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string): boolean => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!validateEmail(username)) {
        setErrorMessage("Por favor, introduce un correo electrónico válido.");
        return;
      }
      // Realizar la solicitud al servidor para autenticar al usuario
      const response = await fetch("http://34.227.46.194:8000/login/ ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Verificar si la autenticación fue exitosa
      if (response.ok) {
        const data = await response.json();
        // Almacenar el token JWT en el localStorage o en las cookies
        localStorage.setItem("token", data.token);
        // Redireccionar al usuario a la página de inicio, por ejemplo
        onLoginSuccess();
      } else {
        // Mostrar un mensaje de error si la autenticación falla
        console.error("Error de inicio de sesión:", response.statusText);
        setErrorMessage(
          "Credenciales incorrectas. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      if (error instanceof Response && error.status === 404) {
        console.error('Error de Login: Recurso no encontrado');
      } 
      if (error instanceof Response && error.status === 401) {
        console.error('Error de Login: No autorizado');
      }
      if (error instanceof Response && error.status === 400) {
        console.error('Error de Login: Solicitud incorrecta');
      }
      if (error instanceof Response && error.status === 500) {
        console.error('Error de Login: Error interno del servidor');
      }else {
        console.error('Error de Login');
      }
    }
  };

  return (
    <div className="login-bg  h-screen bg-gradient-to-r from-[#4b61a6] from-0% via-[#4b61a6] via-50% to-[#afb7cf] to-100%">
      <div className="login-con absolute p-4 rounded-[18px] w-[20%] bg-[#8091F2] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-center mb-4 text-[#274073] text-2xl">
          Sign In to EmailBox
        </h1>
        <div className="line-top mb-6 border border-solid border-white"></div>
        <form className="login-form flex flex-col gap-4" onSubmit={handleLogin}>
          <h2>User Email</h2>
          <Input
            label="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h2>Password</h2>
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Popover placement="right">
            <PopoverTrigger>
              <Button color="default" onClick={handleLogin}>
                Login
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold">Alert</div>
                <div className="text-tiny">
                  {errorMessage && <div>{errorMessage}</div>}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </form>
        <div className="line-bottom mt-6 border border-solid border-white"></div>
      </div>
    </div>
  );
};

export default Login;
