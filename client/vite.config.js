// client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // In local dev, proxy /api → Express on port 5000 so you don't need CORS headers
    proxy: { '/api': 'http://localhost:5000' },
  },
});
