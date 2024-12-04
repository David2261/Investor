import { ssr } from 'vite';

// Create an SSR handler
const handler = async (req, res) => {
  const files = await fs.readdir('./ssr-entry.tsx');

  const html = await renderPage(files);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
};

ssr.createServer(handler).listen(3000, () => {
  console.log('SSR server listening on port 3000');
});