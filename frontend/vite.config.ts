import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: 'index.html',
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./config/jest.setup.ts'],
      globals: true,
    },
    server: {
      historyApiFallback: true,
    },
    define: {
      'import.meta.env': JSON.stringify({
        VITE_API_URL: env.VITE_API_URL || 'https://mocked-api.local',
      }),
    },
  };
});