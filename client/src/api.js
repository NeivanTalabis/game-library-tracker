// client/src/api.js
// In local dev:  Vite proxy forwards /api → http://localhost:5000
// In production: VITE_API_URL points to your Railway server URL
import axios from 'axios';

const base = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

const api = axios.create({ baseURL: base });

export const getGames   = ()         => api.get('/games');
export const getGame    = (id)       => api.get(`/games/${id}`);
export const createGame = (data)     => api.post('/games', data);
export const updateGame = (id, data) => api.put(`/games/${id}`, data);
export const deleteGame = (id)       => api.delete(`/games/${id}`);
