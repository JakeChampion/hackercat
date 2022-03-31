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
  <div>${unsafeHTML(decode(content.content))}</div>

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
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐱</text></svg>">
    <style type="text/css">
      body {
        margin: 40px auto;
        max-width: 650px;
        line-height: 1.6;
        font-size: 18px;
        color: #444;
        padding: 0 10px;
      }
      details {
        content-visibility: auto;
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
        line-height: 1.2
      }
    </style>
    <title>
      HN: ${content.title}
    </title>
  </head>
  <body>
    <a href="/">Home</a>
    <a href="${content.url}"><h1 class="reader-title">${content.title}</h1></a>
    ${content.points} points by <a href="/user/${content.user}">${content.user}</a> ${content.time_ago}
    <hr />
    ${unsafeHTML(decode(content.content))}
    ${content.comments.map(comment)}
  </body>
</html>`;
