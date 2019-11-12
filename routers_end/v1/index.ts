import * as Router from "koa-router";
import * as initRouters from "@libs/initRouters";
import * as path from "path";
let addRouter = function(parentRouter, prefix) {
  let router = new Router({
    prefix: `/${prefix}`
  });
  router.get("/", ctx => {
    ctx.body = "v1/index";
  });
  initRouters(router, path.join(__dirname));
  parentRouter.use(router.routes()).use(router.allowedMethods());
};
export = addRouter;
