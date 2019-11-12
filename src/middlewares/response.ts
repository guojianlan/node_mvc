import * as Koa from "koa";
import { Response } from "@libs/Response";
let injectResponse = (app: Koa) => {
  app.use(async (ctx: Koa.ParameterizedContext, next: () => Promise<any>) => {
    ctx.injectResponse = new Response(ctx);
    await next();
  });
};
export = injectResponse;
