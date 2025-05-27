import { renderToPipeableStream } from 'react-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "./entities/context/AuthContext.tsx";
import App from './App';

export function render(url: string, res: any, template: string) {
  const helmetContext: Record<string, any> = {};
  const queryClient = new QueryClient();

  const app = (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </StaticRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );

  const { pipe } = renderToPipeableStream(app, {
    onShellReady() {
      const { helmet } = helmetContext;

      const head = `
        ${helmet?.title?.toString() || ''}
        ${helmet?.meta?.toString() || ''}
        ${helmet?.link?.toString() || ''}
      `;

      const htmlStart = template
        .replace('<!--ssr-head-->', head)
        .split('<!--ssr-outlet-->')[0];

      const htmlEnd = template.split('<!--ssr-outlet-->')[1];

      res.status(200).setHeader('Content-Type', 'text/html');
      res.write(htmlStart);
      pipe(res);
      res.write(htmlEnd);
    },
    onError(err) {
      console.error(err);
      res.status(500).end('Internal Server Error');
    },
  });
}
