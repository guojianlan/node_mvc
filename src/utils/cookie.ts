import { RouterContext } from "koa-router";
import * as config from "@config/index";
import { isEmpty } from "./common";
export function checkToken(ctx: RouterContext): boolean {
  return !isEmpty(ctx.cookies.get(config.tokenKey));
}

export function setCookieToken(ctx: RouterContext, tokenVal: string) {
  ctx.cookies.set(config.tokenKey, tokenVal, {
    maxAge: config.cookieMaxAge
  });
}
