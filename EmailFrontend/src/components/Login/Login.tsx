// src/Login.tsx
import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
    try {
      // Realizar la solicitud al servidor para autenticar al usuario
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      // Verificar si la autenticación fue exitosa
      if (response.ok) {
        const data = await response.json();
        // Almacenar el token JWT en el localStorage o en las cookies
        localStorage.setItem('token', data.token);
        // Redireccionar al usuario a la página de inicio, por ejemplo
        window.location.href = '/home';
      } else {
        // Mostrar un mensaje de error si la autenticación falla
        console.error('Error de inicio de sesión:', response.statusText);
      }
    } catch (error:any) {
      console.error('Error de inicio de sesión:', error.message);
    }
  };

  return (
    <body className="login-bg">
      <div className="login-con ">
        <h1>Sign In to EmailBox</h1>
        <div className="line-top"></div>
        <form className="login-form" onSubmit={handleLogin}>
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
          <Button color="default" onClick={handleLogin}>Login</Button>
        </form>
        <div className="line-bottom"></div>
      </div>
    </body>
  );
};

export default Login;