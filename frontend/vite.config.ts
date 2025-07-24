import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react({
        fastRefresh: true,
      }),
    ],

    preview: {
      port: 5137,
      host: '127.0.0.1',
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: 'index.html',
      },
      ssr: 'src/entry-server.tsx',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./config/jest.setup.ts'],
      globals: true,
      maxConcurrency: 20,
      pool: 'vmThreads',
      poolOptions: {
        threads: {
          singleThread: true,
        },
      },
      isolate: false,
      css: {
        postcss: './postcss.config.js',
        devSourcemap: true,
        modules: {
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
      deps: {
        optimizer: {
          web: {
            enabled: true,
          },
        },
      },
    },
    server: {
      port: 5137,
      host: '127.0.0.1',
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
      hmr: true,
      // hmr: {
      //   protocol: 'ws',
      //   host: '127.0.0.1',
      //   port: 24678,
      // },
    },
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || 'https://mocked-api.local'),
    },
    ssr: {
      noExternal: ['react-router-dom', 'react-helmet-async'],
      optimizeDeps: {
        include: ['react', 'react-dom'],
      },
    },
  };
});