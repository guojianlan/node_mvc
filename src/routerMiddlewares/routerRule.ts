import * as Koa from "koa";
import * as config from "@config/index";
import * as Cookies from "cookies";
import * as useragent from "useragent";
export let count = 1;
export let checkouToken = () => {
  return true;
};
export let setToken = (ctx: Koa.ParameterizedContext) => {
  console.log("setToken");
};
export let setUseragent = (ctx: Koa.ParameterizedContext) => {
  let browser = getUseragent(ctx);
  let ua = useragent.parse(ctx.headers["user-agent"]);
  if (browser == undefined) {
    this.setCookies(ctx, config.browserNameKey, ua.family, {
      maxAge: config.browserCookieMaxAge,
      httpOnly: true
    });
  }
};
export let getUseragent = (ctx: Koa.Context) => {
  return getCookies(ctx, config.browserNameKey);
};
export let setCookies = (
  ctx: Koa.ParameterizedContext,
  key: string,
  value: string,
  opts?: Cookies.SetOption
) => {
  ctx.cookies.set(key, value, {
    maxAge: 10000000,
    httpOnly: false
  });
};
export let getCookies = (
  ctx: Koa.ParameterizedContext,
  key: string,
  opts?: Cookies.GetOption
) => {
  return ctx.cookies.get(key, opts);
};
