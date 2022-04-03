import { html, unsafeHTML } from "@worker-tools/html";
import { decode } from "html-entities";

// export interface Item {
//     id: number;
//     title: string;
//     points: number | null;
//     user: string | null;
//     time: number;
//     time_ago: string;
//     content: string;
//     deleted?: boolean;
//     dead?: boolean;
//     type: string;
//     url?: string;
//     domain?: string;
//     comments: Item[]; // Comments are items too
//     level: number;
//     comments_count: number;
//   }
const comment = (content) => html`
<details open>
  <summary>
    <span
      ><a href="/user/${content.user}">${content.user}</a>
      ${content.time_ago}</span
    >
  </summary>
  <div>${unsafeHTML(content.content)}</div>

  <ul>
    ${content.comments.map((content) => html`<li>${comment(content)}</li>`)}
  </ul>
</details>`;

export const article = (content) => html`
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
      <a href="${content.url}">
        <h1>${content.title}</h1>
        <small>${content.domain}</small>
      </a>
      <p>
        ${content.points} points by <a href="/user/${content.user}">${content.user}</a> ${content.time_ago}
      </p>
    </article>
    <hr />
    ${unsafeHTML(decode(content.content))}
    ${content.comments.map(comment)}
  </body>
</html>`;
