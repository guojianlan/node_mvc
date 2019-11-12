import * as Koa from "koa";
require("module-alias/register");
import * as R from "ramda";
import * as fs from "fs";
import * as path from "path";
import * as utils from "@utils/index";
import { sequelize } from "@libs/db";
import * as config from "@config/index";
import { IRedis } from "@libs/redis";
interface ServerInterface {
  app: Koa;
  // static MIDDLEWARES:string[];
  useMiddleWares(): void;
  start(): void;
}
class Server implements ServerInterface {
  app: Koa;
  static MIDDLEWARES: string[] = ["response", "start", "router", "error"];
  constructor() {}
  async start() {
    this.app = new Koa();
    this.useMiddleWares();
    await sequelize.authenticate();
    // 添加城市数据
    if (config.alter) {
      await sequelize.sync({ alter: config.alter });
    }
    if (await IRedis.init()) this.app.listen(4987);
  }
  useMiddleWares() {
    // 自动加载middlewares里面的文件
    let middlewares = R.filter((md_name: string) => {
      return (
        md_name != "" &&
        fs.existsSync(path.join(__dirname, "./middlewares", md_name + ".js"))
      );
    })(Server.MIDDLEWARES);
    R.forEach(
      R.pipe(
        (md_name: string) => {
          let filePath = path.join(__dirname, "./middlewares", md_name);
          return require(filePath);
        },
        fn => {
          if (utils.checkFn(fn)) {
            fn(this.app, this);
          }
        }
      )
    )(middlewares);
  }
}
export { Server };
