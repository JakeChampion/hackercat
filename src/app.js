import { URLPattern } from "./polyfill/URLPattern.js";
import { methodNotAllowed, notFound, internalServerError } from "@worker-tools/response-creators";

import { top } from "./handlers/top.js";
import { item } from "./handlers/item.js";
import { redirectToTop } from "./handlers/redirectToTop.js";
import { icon } from "./handlers/icon.js";
import { handlePurge } from "./handlers/handlePurge.js";
import { user } from "./handlers/user.js";

export const allowed_methods = new Set(["GET", "HEAD", "OPTIONS", "PURGE"]);

const patternsToHandlers = new Map([
  [{ pathname: "(/|/top\/?)" }, redirectToTop],
  [{ pathname: "/icon.svg" }, icon],
  [{ pathname: "/top/:pageNumber([1]?[0-9]|20)" }, top],
  [{ pathname: "/item/:id(\\d+)" }, item],
  [{ pathname: "/user/:name" }, user],
]);

export const routingMap = new Map();
for (const [patternInput, handler] of patternsToHandlers) {
  const compiledPattern = new URLPattern(patternInput);
  routingMap.set(compiledPattern, handler);
}

export async function app(event) {

  try {
    // Get the client request
    const request = event.request;
    // Return a 405 if request method is not one we support
    const method = request.method;
    if (!allowed_methods.has(method)) {
      return await methodNotAllowed(`${method} method not allowed`);
    }

    if (request.method === "PURGE") {
      return await handlePurge(request);
    }

    for (const [compiledPattern, handler] of routingMap) {
      const result = compiledPattern.exec(event.request.url);
      if (result) {
        return await handler(event.request, result);
      }
    }

    // If no route matches return 404
    return notFound("Not Found");
  } catch (error) {
    return internalServerError(`Error: ${error.message}
    Stack: ${error.stack}`)
  }
}
