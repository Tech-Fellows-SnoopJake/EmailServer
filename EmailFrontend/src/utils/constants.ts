// src/config.ts

// Función para obtener variables de entorno de forma segura
function getEnvVariable(key: string, defaultValue: string): string {
  // Intenta usar import.meta.env si está disponible (para Vite)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || defaultValue;
  }

  // De lo contrario, usa process.env (compatible con Node.js/Jest)
  return process.env[key] || defaultValue;
}

// Definir variables de entorno específicas
export const API_URL = getEnvVariable('VITE_REACT_API_URL', 'http://localhost:8000');