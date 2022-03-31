import { html } from "@worker-tools/html";

export const home = (content, pageNumber) => html`
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
        padding: 0;
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
        grid-template-areas: "header main footer";
        gap: 1em;
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
      li:before {
        counter-increment: section;
        content: counter(section);
        font-size: 1.6em;
        font-weight: 200;
        margin-right: 1em;
        width: 1em;
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
              <br>
              <a class="comments" href="/item/${data.id}">view ${data.comments_count > 0 ? data.comments_count +' comments' : 'discussion'}</a>
            </li>`
        })}
    </ol>
    <a href="/top/${pageNumber+1}">More</a>
  </body>
</html>`