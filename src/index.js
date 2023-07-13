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

async function serverTiming (ctx, next) {
  await next()
  ctx.header("x-trailer-server-timing", "rtt,timestamp,retrans")
}

const app = new Hono()
app.use('*', logger())
app.use('*', compress)
app.use('*', serverTiming)
app.get('/', redirectToTop)
app.get('/top', redirectToTop)
app.get('/top/', redirectToTop)
app.get('/icon.svg', icon)
app.get('/top/:pageNumber{[1]?[0-9]|20}', (c) => {
  const pageNumber = Number.parseInt(c.req.param('pageNumber'), 10);
  return top(pageNumber)
})
app.get('/item/:id{[0-9]+}', (c) => {
  const id = Number.parseInt(c.req.param('id'), 10);
  return item(id)
})
app.get('/user/:name', (c) => {
  const name = c.req.param('name')
  return user(name)
})
app.fire()
