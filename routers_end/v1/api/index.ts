import * as Router from "koa-router";

let addRouter = function(parentRouter,prefix) {
  let router = new Router({
    prefix:`/${prefix}`
  });
  router.get("/", ctx => {
    ctx.body = "v1/api/index";
  });
  parentRouter.use(router.routes()).use(router.allowedMethods());
};
export = addRouter;
