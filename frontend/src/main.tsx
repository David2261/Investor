import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./entities/context/AuthContext.tsx";
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root')!);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <BrowserRouter future={{
      v7_relativeSplatPath: true,
      }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)