import { Controller, Get, Post } from "@decorator/index";
import { RouterContext } from "koa-router";
import { smsFactory } from "@factory/sms/index";
import { sessMiddleware, bodyparser } from "@src/routerMiddlewares";
import * as utils from "@utils/index";
import { UserService } from "@service/user";
import { UserSchema } from "@schema/user";
@Controller("/api/user", {
  priority: 3
})
class User {
  hehe() {
    console.log("hehe");
  }
  @Post("/login/code", {
    middlewares: [bodyparser]
  })
  async loginCode(ctx: RouterContext) {
    let data = utils.normalizeData(["username", "code"], ctx.request.body);
    ctx.injectResponse.success(data);
  }
  @Get("/list")
  async getList(ctx: RouterContext) {
    // let code = smsFactory.smsInstance().sendSms();
    // console.log(code);
    return (ctx.body = "Controller_user_getList");
  }
  @Get("/:id")
  async index(ctx: RouterContext) {
    return (ctx.body = "Controller_user_index");
  }
  @Post("/register", {
    middlewares: [bodyparser]
  })
  async register(ctx: RouterContext) {
    // 获取网络内容
    let body = utils.normalizeData(
      ["username", "code", "password"],
      ctx.request.body
    );
    // 验证通过
    let rules = new UserSchema("register");
    if (!(await rules.validator(body))) {
      return ctx.injectResponse.failParameter(rules.errors);
    }
    // 创建用户
    let userService = new UserService();
    if (!(await userService.addUser(body.username, body.password, body.code))) {
      return ctx.injectResponse.failService(userService);
    }
    // 创建成功
    let $data = userService.getData();
    if (!(await userService.saveSessId($data.id))) {
      return ctx.injectResponse.failService(userService);
    }
    delete $data.id;
    $data.sessId = userService.getData().sessId;
    return ctx.injectResponse.success($data);
  }
  @Post("/login", {
    middlewares: [bodyparser]
  })
  async login(ctx: RouterContext) {
    let body = utils.normalizeData(["username", "password"], ctx.request.body);
    let rules = new UserSchema("login");
    if (!(await rules.validator(body))) {
      return ctx.injectResponse.failParameter(rules.errors);
    }
    let userService = new UserService();
    if (!(await userService.login(body.username, body.password))) {
      return ctx.injectResponse.failService(userService);
    }
    let $data = userService.getData();
    if (!(await userService.saveSessId($data.id))) {
      return ctx.injectResponse.failService(userService);
    }
    $data.sessId = userService.getData().sessId;
    // 客户端使用cookie先存起来
    return ctx.injectResponse.success($data);
  }
}
export = User;
