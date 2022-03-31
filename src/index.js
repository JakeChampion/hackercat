import { URLPattern } from './polyfill/URLPattern';
import { HTMLResponse } from "@worker-tools/html";
import { methodNotAllowed, notFound, ok, permanentRedirect } from "@worker-tools/response-creators";
import { home } from "./layouts/hn";
import { article } from "./layouts/article";

const allowed_methods = new Set([
  "GET",
  "HEAD",
  "OPTIONS",
  "PURGE",
]);

const patternsToHandlers = new Map([
  [{pathname: '/'}, redirectToTop],
  [{pathname: '/top'}, redirectToTop],
  [{pathname: '/top/'}, redirectToTop],
  [{pathname: '/top/:pageNumber(\\d+)'}, top],
  [{pathname: '/item/:id(\\d+)'}, item],
]);

const routingMap = new Map();
for (const [patternInput, handler] of patternsToHandlers) {
  const compiledPattern = new URLPattern(patternInput);
  routingMap.set(compiledPattern, handler);
}

addEventListener('fetch', (event) => {
  // Get the client request
  const request = event.request
  // Return a 405 if request method is not one we support
  const method = request.method;
  if (!allowed_methods.has(method)) {
    return methodNotAllowed(`${method} method not allowed`);
  }

  if (request.method === "PURGE") {
    return handlePurge(request);
  }

  for (const [compiledPattern, handler] of routingMap) {
    const result = compiledPattern.exec(event.request.url);
    if (result) {
      return event.respondWith(handler(event.request, result));
    }
  }

  // If no route matches return 404
  return event.respondWith(notFound('Not Found'));
});

async function handlePurge(request) {
  // Don't allow unauthenticated purge requests
  request.headers.set("Fastly-Purge-Requires-Auth", "1");
  return fetch(request, {
    backend: "hn",
  });
}

async function top(request, result) {
  const pageNumber = Number.parseInt(result.pathname.groups.pageNumber, 10);
  const backendResponse = await fetch(
  `https://api.hnpwa.com/v0/news/${pageNumber}.json`,
    {
      backend: "hn",
    }
  );
  const results = await backendResponse.json();
  const body = home(results, pageNumber);
  return new HTMLResponse(body, ok());
}

async function item(request, result) {
  const id = Number.parseInt(result.pathname.groups.id, 10);
  const backendResponse = await fetch(
  `https://api.hnpwa.com/v0/item/${id}.json`,
    {
      backend: "hn",
    }
  );
  const results = await backendResponse.json();
  const body = article(results);
  return new HTMLResponse(body, ok());
}

function redirectToTop() {
  return permanentRedirect("/top/1");
}
