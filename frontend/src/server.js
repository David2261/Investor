const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./App');

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  const markup = ReactDOMServer.renderToString(<App />);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Investor Home</title>
      </head>
      <body>
        <div id="root">${markup}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('туц туц туц порт 3000');
});