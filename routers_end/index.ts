import * as Koa from "koa";
import * as Router from "koa-router";
import * as utils from "@utils/index";
import * as fs from "fs";
import * as path from "path";
import * as R from "ramda";
import * as config from "@config/index";
import * as initRouters from "@libs/initRouters";
import * as routerRule from "@routerMiddlewares/routerRule";

// root路由
let router = new Router();
/**
 * 加载当前文件夹下面的所有文件,下面一定是index.js文件开头
 */
router.use(async (ctx, next) => {
  // 设置browser
  routerRule.setUseragent(ctx);
  await next();
});
initRouters(router, path.join(__dirname), config.activeRouter);
router.get("/", (ctx: Koa.ParameterizedContext) => {
  // 设置token
  ctx.body = "333123131";
});
export = router;
