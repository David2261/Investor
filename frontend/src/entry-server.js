import { ssr } from 'vite';

// Create an SSR handler
const handler = async (req, res) => {
  // Read files from the file system on the server-side
  const files = await fs.readdir('./ssr-entry.tsx');

  // Render the page with the file data
  const html = await renderPage(files);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
};

// Start the SSR server
ssr.createServer(handler).listen(3000, () => {
  console.log('SSR server listening on port 3000');
});