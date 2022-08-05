const koa = require('koa') // Koa framework - http://koajs.com/
const Router = require('koa-router');
const router = require('./router');
const koaBody = require('koa-body')(({ multipart: true}))

const app = new koa()

// app.use(compress({ level : 3 }))
app.use(koaBody)
app.proxy = true

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000);
console.log(`listening on http://localhost:3000`);