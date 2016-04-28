const app = require('koa')()
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')

const lol = require('./lib')

// LOL
router.post('/lol', lol)

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000);

console.log('listening on port 3000')
