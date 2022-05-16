import { HTMLResponse } from "@worker-tools/html";
import { internalServerError, notFound, ok } from "@worker-tools/response-creators";

import { home } from "../layouts/hn.js";

export async function top(pageNumber) {
  const backendResponse = await fetch(
    `https://api.hnpwa.com/v0/news/${pageNumber}.json`,
    {
      backend: "hn",
      cacheOverride: new CacheOverride("pass"),
    }
  );
  if (backendResponse.status >= 500) {
    return notFound('No such page')
  }
  try {
    const results = await backendResponse.json();
    if (!results || !results.length) {
      return notFound('No such page')
    }
    const body = home(results, pageNumber);
    return new HTMLResponse(body, ok());
  } catch (error) {
    return notFound('No such page')
  }
}
