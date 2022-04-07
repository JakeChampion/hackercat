import { HTMLResponse } from "@worker-tools/html";
import { internalServerError, ok } from "@worker-tools/response-creators";

import { user as profile } from "../layouts/user.js";

export async function user(request, result) {
  const name = result.pathname.groups.name;
  const backendResponse = await fetch(
    `https://api.hnpwa.com/v0/user/${name}.json`,
    {
      backend: "hn",
      cacheOverride: new CacheOverride("pass"),
    }
  );
  if (backendResponse.status != 200) {
    return internalServerError('https://api.hnpwa.com is currently not responding')
  }
  const results = await backendResponse.json();
  console.log(name)
  console.log(`https://api.hnpwa.com/v0/user/${name}.json`)
  console.log(JSON.stringify(results))
  const body = profile(results);
  return new HTMLResponse(body, ok());
}
