import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { API_URL } from "../../utils/constants";

const statusErrorMessages: Record<number, string> = {
  400: "Error de registro: Solicitud incorrecta",
  401: "Error de registro: No autorizado",
  404: "Error de registro: Recurso no encontrado",
  500: "Error de registro: Error interno del servidor",
}

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
   
    try {
      if (password !== password2) {
        console.error('Las contraseñas no coinciden');
        return;
      }
      // Realizar la solicitud al servidor para registrar al usuario
      const response = await fetch(`${API_URL}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      // Verificar si el registro fue exitoso
      if (response.ok) {
        // Redireccionar al usuario a la página de inicio después del registro
        /*
        if (process.env.NODE_ENV === 'production') {
          window.location.href = '/home'; // /home o /
        }
        */
       
       window.location.href = '/login';
      } else {
        // Mostrar un mensaje de error si el registro falla
        console.error('Error de registro:', response.statusText);
      }
    } catch (error) {
      const status = error instanceof Response ? error.status : null
      if (status && status in statusErrorMessages) {
        console.error(statusErrorMessages[status])
      } else {
        console.error("Error de Login")
      }
    }
  };

  return (
    <div className="register-bg h-screen flex justify-center items-center bg-gradient-to-r from-[#4b61a6] from-0% via-[#4b61a6] via-50% to-[#afb7cf] to-100%" style={{overflowY: 'scroll'}}>
      <div className="register-con p-4 rounded-[18px] w-[350px] bg-[#8091F2]">
        <h1 className="text-center mb-4 text-[#274073] text-2xl">Create an account</h1>
        <div className="line-top mb-6 border border-solid border-white"></div>
        <form className="register-form flex flex-col gap-4" onSubmit={handleRegister}>
          <h2>Username</h2>
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isRequired
          />
          <h2>Password</h2>
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired
          />
          <h2>Confirm password</h2>
          <Input
            type="password"
            label="Password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            isRequired
            errorMessage={password !== password2 ? 'Passwords do not match': ''}
          />
          <Button color="default" onClick={handleRegister} isDisabled={password !== password2}>Create account</Button>
        </form>
        <br />
        <p>Already have an account? <a href="/login" className="text-white">Login</a></p>
        <div className="line-bottom mt-6 border border-solid border-white"></div>
      </div>
    </div>
  );
};

export default Register;
