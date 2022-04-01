import { HTMLResponse } from "@worker-tools/html";
import { ok } from "@worker-tools/response-creators";

import { home } from "../layouts/hn.js";

export async function top(request, result) {
  const pageNumber = Number.parseInt(result.pathname.groups.pageNumber, 10);
  const backendResponse = await fetch(
    `https://api.hnpwa.com/v0/news/${pageNumber}.json`,
    {
      backend: "hn",
      cacheOverride: new CacheOverride("pass"),
    }
  );
  const results = await backendResponse.json();
  const body = home(results, pageNumber);
  return new HTMLResponse(body, ok());
}
