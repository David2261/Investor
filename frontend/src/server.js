const express = require('express');
const cors = require('cors');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const { HelmetProvider } = require('react-helmet-async');
const App = require('./App').default;
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
app.use(
  express.static(path.join(__dirname, 'public')),
  cors({
    origin: 'http://investor-home.ru',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle all GET requests
app.get('*', (req, res) => {
  const context = {};
  const helmetContext = {};

  try {
    // Рендеринг приложения с учетом текущего маршрута
    const markup = ReactDOMServer.renderToString(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    );

    if (context.url) {
      return res.redirect(301, context.url);
    }

    const { helmet } = helmetContext;

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Investor Home</title>
          <meta name="robots" content="index,follow">
          <meta name="googlebot" content="index,follow">
          <meta name="theme-color" content="#2F4F4F">
          <meta name="rating" content="14 years">
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
