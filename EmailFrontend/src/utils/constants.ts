// /constants.ts

// Función para obtener variables de entorno de forma segura
function getEnvVariable(key: string, defaultValue: string): string {
  // Verifica si está en un entorno de testing (Jest)
  if (process.env.NODE_ENV === 'test') {
    // Usa process.env, pues import.meta.env no está disponible en Jest
    return process.env[key] || defaultValue;
  }

  // Intenta usar import.meta.env si está disponible (para Vite)
  // Asegúrese de tener la configuración adecuada para esto en su compilación Vite/TypeScript
  // Este código se presume que está funcionando fuera de Jest, donde import.meta.env es válida
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key] || defaultValue;
  }

  return defaultValue;
}

// Definir variables de entorno específicas
export const API_URL = getEnvVariable('VITE_REACT_API_URL', 'http://localhost:8000');