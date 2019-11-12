import { Controller, Get, Post } from "@decorator/index";
import { RouterContext } from "koa-router";
import * as KoaBody from "koa-bodyparser";
import { UserService } from "@service/index";
import * as utils from "@utils/index";
import { AppService } from "@service/app";
@Controller("", {
  priority: 200
})
class Index {
  @Get("/*")
  async index(ctx: RouterContext) {
    if (!utils.checkToken(ctx)) {
      let appservice = new AppService();
      if (!(await appservice.addToken())) {
        return ctx.injectResponse.fail();
      }
      utils.setCookieToken(ctx, appservice.getData().token);
    }
    return await ctx.render('index')
  }
}
export = Index;
