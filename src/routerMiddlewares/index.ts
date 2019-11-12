import { RouterContext } from "koa-router";
import * as utils from "@utils/index";
import { IRedis } from "@libs/redis";
import * as config from "@config/index";
import * as koaBody from "koa-bodyparser";
export async function sessMiddleware(
  ctx: RouterContext,
  next: () => Promise<any>
) {
  let data = utils.normalizeData([config.authorizationKey], ctx.headers);
  if (utils.isEmpty(data[config.authorizationKey])) {
    return ctx.throw(401);
  }
  let field = data[config.authorizationKey];
  let sess = await IRedis.getInstance().hget(config.sessIdKey, field);
  if (utils.isEmpty(sess)) {
    return ctx.throw(401);
  }
  // 更新活跃时间
  await IRedis.getInstance().hset(
    config.sessIdKey,
    field,
    JSON.stringify(
      Object.assign({}, JSON.parse(sess), { activeTime: +new Date() })
    )
  );
  if (utils.isEmpty(ctx.session)) {
    ctx.session = {
      users: JSON.parse(sess)
    };
  }
  await next();
}
export let bodyparser = koaBody();
