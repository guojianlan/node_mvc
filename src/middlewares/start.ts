import * as Koa from "koa";
let starter = (app: Koa) => {
  // 这里可以记录请求时间
  app.use(async (ctx, next) => {
    try {
      let start_time = Date.now();
      await next();
      console.log(`加载${ctx.url}的时间为:${Date.now() - start_time}`);
    } catch (error) {
      console.log("emit error");
      ctx.app.emit("error", error, ctx);
    }
  });
};
export = starter;
