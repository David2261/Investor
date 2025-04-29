import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
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

const configFuture =  {
  v7_relativeSplatPath: true, // Включает относительные пути во вложенных маршрутах
  v7_startTransition: true,
  v7_fetcherPersist: true,   // Сохраняет состояние выборки во время навигации
  v7_normalizeFormMethod: true, // Нормализует методы формирования (POST или GET)
  v7_partialHydration: true, // Поддерживает частичную гидратацию для рендеринга на стороне сервера
  v7_skipActionErrorRevalidation: true, // Предотвращает повторную проверку при возникновении ошибок действий
}

hydrateRoot(
  root,
  <BrowserRouter future={configFuture}>
    <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>
);