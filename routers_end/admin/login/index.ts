import * as Router from "koa-router";
import * as path from "path";
// import * as initRouters from "@libs/initRouters";

let addRouter = function(parentRouter, prefix) {
  let router = new Router({
    prefix: `/${prefix}`
  });

  router.get("/", ctx => {
    ctx.body = "admin/123index";
  });
  parentRouter.use(router.routes()).use(router.allowedMethods());
};
export = addRouter;
