// src/index.ts
import { Hono } from 'hono'
import { logger } from "hono/logger";
import { icon } from './handlers/icon';
import { item } from './handlers/item';
import { redirectToTop } from './handlers/redirectToTop';
import { top } from './handlers/top';
import { user } from './handlers/user';

console.trace = console.log

async function compress (ctx, next) {
  await next()
  if (ctx.res.body) {
    ctx.header("x-compress-hint", "on");
  }
}

const app = new Hono()
app.use('*', logger())
app.use('*', compress())
app.head('/', redirectToTop)
app.get('/', redirectToTop)
app.head('/top', redirectToTop)
app.get('/top', redirectToTop)
app.head('/top/', redirectToTop)
app.get('/top/', redirectToTop)
app.head('/icon.svg', icon)
app.get('/icon.svg', icon)
app.head('/top/:pageNumber{[1]?[0-9]|20}', (c) => {
  const pageNumber = Number.parseInt(c.req.param('pageNumber'), 10);
  return top(pageNumber)
})
app.get('/top/:pageNumber{[1]?[0-9]|20}', (c) => {
  const pageNumber = Number.parseInt(c.req.param('pageNumber'), 10);
  return top(pageNumber)
})
app.head('/item/:id{[0-9]+}', (c) => {
  const id = Number.parseInt(c.req.param('id'), 10);
  return item(id)
})
app.get('/item/:id{[0-9]+}', (c) => {
  const id = Number.parseInt(c.req.param('id'), 10);
  return item(id)
})
app.head('/user/:name', (c) => {
  const name = c.req.param('name')
  return user(name)
})
app.get('/user/:name', (c) => {
  const name = c.req.param('name')
  return user(name)
})
app.fire()