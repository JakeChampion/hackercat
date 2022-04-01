import { app } from './app';

addEventListener('fetch', (event) => {
  return event.respondWith(app(event));
});
