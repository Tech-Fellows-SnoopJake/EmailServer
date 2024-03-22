require('dotenv').config();
// src/config.ts
export const API_URL = import.meta.env.VITE_REACT_API_URL || 'http://localhost:8000';