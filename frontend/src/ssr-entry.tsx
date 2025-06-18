import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import App from './App';

export function render() {
  const appString = renderToPipeableStream(<App />);
  return appString;
}