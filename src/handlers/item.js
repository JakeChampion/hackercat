import { HTMLResponse } from "@worker-tools/html";
import { ok } from "@worker-tools/response-creators";

import { article } from "../layouts/article.js";

export async function item(request, result) {
  const id = Number.parseInt(result.pathname.groups.id, 10);
  const backendResponse = await fetch(
    `https://api.hnpwa.com/v0/item/${id}.json`,
    {
      backend: "hn",
      cacheOverride: new CacheOverride("override", { ttl: 600, swr: 600 }),
    }
  );
  const results = await backendResponse.json();
  const body = article(results);
  return new HTMLResponse(body, ok());
}
