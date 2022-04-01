export async function handlePurge(request) {
  // Don't allow unauthenticated purge requests
  request.headers.set("Fastly-Purge-Requires-Auth", "1");
  return fetch(request, {
    backend: "hn",
  });
}
