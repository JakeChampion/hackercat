import { html, unsafeHTML } from "@worker-tools/html";
import { decode } from "html-entities";

export const user = (content) => html`
<!DOCTYPE html>
<html lang="en" >
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/svg+xml" href="/icon.svg">
    <style type="text/css">
      * {
        box-sizing: border-box;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        background-color: whitesmoke;
        margin: 40px auto;
        max-width: 80ch;
        line-height: 1.6;
        font-size: 18px;
        color: #444;
        padding: 0 10px;
      }
      details {
        background-color: whitesmoke;
        margin: 40px auto;
        max-width: 650px;
        line-height: 1.6;
        font-size: 18px;
        color: #444;
      }
      summary {
        font-weight: bold;
        margin: -.5em -.5em 0;
        padding: .5em;
      }
      details[open] summary {
        border-bottom: 1px solid #aaa;
      }
      pre {
        white-space: pre-wrap;
      }
      ul {
        padding-left: 1em;
        list-style: none;
      }
      h1,h2,h3 {
        line-height: 1.2;
        font-size: x-large;
        margin: 0;
      }
      hr {
        border: 0.5em solid rgba(0,0,0,.1);
        margin: 2em 0;
      }
      article {
        padding-left: 1em;
      }

      small {
        display: block;
        padding-top: .5em;
      }
      p {
        padding-block: 0.5em;
        margin: 0;
      }
    </style>
    <title>
      HN: ${content.title}
    </title>
  </head>
  <body>
    <article>
      <h1>${content.id}</h1>
      <p>
        has ${content.karma} karma and joined ${content.created}
      </p>
      <p>
      <a href="https://news.ycombinator.com/submitted?id=${content.id}">submissions</a> / <a href="https://news.ycombinator.com/threads?id=${content.id}">comments</a> / <a href="https://news.ycombinator.com/favorites?id=${content.id}">favourites</a>
      </p>
    </article>
    <hr />
    ${unsafeHTML(content.about)}
  </body>
</html>`;
