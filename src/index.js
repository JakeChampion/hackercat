import { app } from './app.js';

addEventListener('fetch', (event) => {
  return event.respondWith(app(event));
});
