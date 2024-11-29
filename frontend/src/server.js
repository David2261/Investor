const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server'); // StaticRouter для SSR
const App = require('./App').default;
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle all GET requests
app.get('*', (req, res) => {
  const context = {}; // Контекст для обработки редиректов

  try {
    // Рендеринг приложения с учетом текущего маршрута
    const markup = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    );

    // Если был редирект
    if (context.url) {
      return res.redirect(301, context.url);
    }

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Investor Home</title>
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <div id="root">${markup}</div>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error during SSR:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
