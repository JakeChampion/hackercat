import { URLPattern } from "./polyfill/URLPattern.js";
import { methodNotAllowed, notFound } from "@worker-tools/response-creators";

import { top } from "./handlers/top.js";
import { item } from "./handlers/item.js";
import { redirectToTop } from "./handlers/redirectToTop.js";
import { icon } from "./handlers/icon.js";
import { handlePurge } from "./handlers/handlePurge.js";

export const allowed_methods = new Set(["GET", "HEAD", "OPTIONS", "PURGE"]);

const patternsToHandlers = new Map([
  [{ pathname: "/" }, redirectToTop],
  [{ pathname: "/icon.svg" }, icon],
  [{ pathname: "/top" }, redirectToTop],
  [{ pathname: "/top/" }, redirectToTop],
  [{ pathname: "/top/:pageNumber(\\d+)" }, top],
  [{ pathname: "/item/:id(\\d+)" }, item],
]);

export const routingMap = new Map();
for (const [patternInput, handler] of patternsToHandlers) {
  const compiledPattern = new URLPattern(patternInput);
  routingMap.set(compiledPattern, handler);
}

export async function app(event) {
  // Get the client request
  const request = event.request;
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
      return handler(event.request, result);
    }
  }

  // If no route matches return 404
  return notFound("Not Found");
}
