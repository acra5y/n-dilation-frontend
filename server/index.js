import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '../app/components/App';
import Html from './Html';

const port = 3000;
const server = express();

server.get('/', (req, res) => {
  const component = renderToString(<App />);

  res.send(Html(component));
});

server.listen(port);
console.log(`listening on port ${port}...`);
