import { html } from "@worker-tools/html";

export const home = (content, pageNumber) => html`
<!DOCTYPE html>
<html lang="en" >
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/svg+xml" href="/icon.svg">
    <style type="text/css">
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        background-color: whitesmoke;
        margin: 40px auto;
        max-width: 650px;
        line-height: 1.6;
        font-size: 18px;
        padding: 0 1em;
        box-sizing: border-box;
      }
      ol {
        list-style-type: none;
        counter-reset: section;
        counter-set: section ${pageNumber === 1 ? 0 : (pageNumber-1)*30};
        padding: 0;
      }
      li {
        position: relative;
        display: grid;
        grid-template-columns: 0fr 1fr;
        grid-template-areas:
          ". main"
          ". footer"
          ". .";
        gap: 1em;
        margin-bottom: 1em;
      }
      li:before {
        counter-increment: section;
        content: counter(section);
        font-size: 1.6em;
        position: absolute;
      }
      li:after {
        content: "";
        background: black;
        position: absolute;
        bottom: 0;
        left: 3em;
        width: calc(100% - 3em);
        height: 1px;
      }
      li > * {
        margin-left: 2em;
      }
      .title {
        grid-area: main;
      }
      .comments {
        grid-area: footer;
      }
      a {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
      }
      h1,h2,h3 {
        line-height: 1.2
      }
    </style>
    <title>
      HN: Page ${pageNumber}
    </title>
  </head>
  <body>
    <ol>
        ${content.map(data => {
            return html`
            <li>
              <a class="title" href="${data.url}">${data.title}</a>
              <a class="comments" href="/item/${data.id}">view ${data.comments_count > 0 ? data.comments_count +' comments' : 'discussion'}</a>
            </li>`
        })}
    </ol>
    <a href="/top/${pageNumber+1}" style="text-align: center;">More</a>
  </body>
</html>`
