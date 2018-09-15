const router = require('koa-router')()


router.use(async function (ctx,next) {
  console.log("originalUrl:",ctx.originalUrl,"method:",ctx.method);
  await next()
})
/*router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})*/

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('*', async (ctx, next)=>{
  await ctx.render('app',{
    title:'Koa2-React'
  })
})

module.exports = router
