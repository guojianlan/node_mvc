import * as Router from 'koa-router'


let addRouter = function(){
  let router = new Router();

  router.get('/',(ctx)=>{
    ctx.body='v2/index'
  })
}
export  = addRouter