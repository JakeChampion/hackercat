import { HTMLResponse } from "@worker-tools/html";
import { internalServerError, ok, notFound } from "@worker-tools/response-creators";

import { article } from "../layouts/article.js";

export async function item(request, result) {
  const id = Number.parseInt(result.pathname.groups.id, 10);
  const backendResponse = await fetch(
    `https://api.hnpwa.com/v0/item/${id}.json`,
    {
      backend: "hn",
      cacheOverride: new CacheOverride("pass"),
    }
  );
  if (backendResponse.status >= 500) {
    return internalServerError('https://api.hnpwa.com is currently not responding')
  }
  const results = await backendResponse.json();
  if (!results) {
    return notFound('No such item')
  }
  const body = article(results);
  return new HTMLResponse(body, ok());
}
