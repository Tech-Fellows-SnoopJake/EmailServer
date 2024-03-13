---
sidebar_position: 1
---

# The Code!

```typescript
// EmailFrontend/src/components/Login/Login.tsx

import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';

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
    <body className="login-bg  h-screen bg-gradient-to-r from-[#4b61a6] from-0% via-[#4b61a6] via-50% to-[#afb7cf] to-100%">
      <div className="login-con absolute p-4 rounded-[18px] w-[20%] bg-[#8091F2] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <h1 className='text-center mb-4 text-[#274073] text-2xl'>Sign In to EmailBox</h1>
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
          <Button color="default" onClick={handleLogin}>Login</Button>
        </form>
        <div className="line-bottom mt-6 border border-solid border-white"></div>
      </div>
    </body>
  );
};

export default Login;

```
