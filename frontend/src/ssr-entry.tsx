import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

export function render() {
  const appString = renderToString(<App />);
  return appString;
}