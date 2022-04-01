import { permanentRedirect } from "@worker-tools/response-creators";

export function redirectToTop() {
  return permanentRedirect("/top/1");
}
