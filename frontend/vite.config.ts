import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', (_err, _req, res) => {
            // Backend server (port 8000) is not running yet.
            // Respond with 503 so frontend services catch it and use synthetic mock data without noisy terminal crashes.
            if ('writeHead' in res && !res.headersSent) {
              res.writeHead(503, { 'Content-Type': 'application/json' });
              res.end(
                JSON.stringify({
                  error: {
                    code: 'BACKEND_OFFLINE',
                    message: 'Backend server on port 8000 is offline. Frontend is running in mock mode.',
                  },
                })
              );
            }
          });
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
} as any);

