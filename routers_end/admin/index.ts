import * as Router from "koa-router";
import * as path from "path";
import * as initRouters from "@libs/initRouters";
import * as routerRule from '@routerMiddlewares/routerRule'
import {User} from '@models/User'
let addRouter = function(parentRouter, prefix) {
  let router = new Router({
    prefix: `/${prefix}`
  });
  router.get("/", async (ctx) => {
    console.log('admin/index')
    let users = await User.findAll();
    console.log(routerRule.getUseragent(ctx));
    ctx.body = "admin/index";
  });
  initRouters(router, path.join(__dirname));
  parentRouter.use(router.routes()).use(router.allowedMethods());
};
export = addRouter;
