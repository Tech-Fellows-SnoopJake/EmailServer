import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
   
    try {
      // Realizar la solicitud al servidor para registrar al usuario
      const response = await fetch('http://34.227.46.194:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      // Verificar si el registro fue exitoso
      if (response.ok) {
        const data = await response.json();
        // Almacenar el token JWT en el localStorage o en las cookies si es necesario
        localStorage.setItem('token', data.token);
        // Redireccionar al usuario a la página de inicio después del registro
        if (process.env.NODE_ENV === 'production') {
          window.location.href = '/home';
        }
      } else {
        // Mostrar un mensaje de error si el registro falla
        console.error('Error de registro:', response.statusText);
      }
    } catch (error) {
      if (error instanceof Response && error.status === 404) {
        console.error('Error de registro: Recurso no encontrado');
      } 
      if (error instanceof Response && error.status === 401) {
        console.error('Error de registro: No autorizado');
      }
      if (error instanceof Response && error.status === 400) {
        console.error('Error de registro: Solicitud incorrecta');
      }
      if (error instanceof Response && error.status === 500) {
        console.error('Error de registro: Error interno del servidor');
      }else {
        console.error('Error de registro:');
      }
    }
  };

  return (
    <div className="register-bg h-screen flex justify-center items-center bg-gradient-to-r from-[#4b61a6] from-0% via-[#4b61a6] via-50% to-[#afb7cf] to-100%">
      <div className="register-con p-4 rounded-[18px] w-[20%] bg-[#8091F2]">
        <h1 className="text-center mb-4 text-[#274073] text-2xl">Create an account</h1>
        <div className="line-top mb-6 border border-solid border-white"></div>
        <form className="register-form flex flex-col gap-4" onSubmit={handleRegister}>
          <h2>Username</h2>
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h2>Email</h2>
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h2>Password</h2>
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button color="default" onClick={handleRegister}>Create account</Button>
        </form>
        <div className="line-bottom mt-6 border border-solid border-white"></div>
      </div>
    </div>
  );
};

export default Register;
