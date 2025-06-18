import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use(cors({
    origin: 'http://127.0.0.1:5137',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      let template = fs.readFileSync(path.resolve('index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
      render(url, res, template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end('Internal Server Error');
    }
  });


  const port = 5137;
  const host = '127.0.0.1';
  app.listen(port, host, () => {
    console.log(`✅ SSR server running at http://${host}:${port}`);
  });
}

startServer();
