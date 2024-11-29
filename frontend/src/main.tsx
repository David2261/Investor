import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./entities/context/AuthContext.tsx";
import './index.css'

const root = document.getElementById('root')!;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

hydrateRoot(
  root,
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);