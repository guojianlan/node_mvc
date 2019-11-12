import * as path from "path";
import * as Koa from "koa";
import * as glob from "glob";
import * as Router from "koa-router";
import { meta } from "./meta";
import "reflect-metadata";
import { RouterOption } from "./index";
function isConstructor(str: string): any {
  return str == "constructor";
}
export function loadController(controller_dir: string) {
  return function init(app: Koa) {
    // 读取controller_dir下面所有的文件
    let files_dir = glob.sync(path.join(controller_dir, "**/**.js"));
    let files_instance = [];
    files_dir.forEach(item => {
      files_instance.push(require(item));
    });
    //  排序加载
    files_instance.sort((x, y) => {
      let class_option_x = Reflect.getMetadata(meta.router_class_option, x);
      let class_option_y = Reflect.getMetadata(meta.router_class_option, y);
      return class_option_x.priority - class_option_y.priority;
    });
    // 排序之后开始加载
    files_instance.forEach(item => {
      let prefix = Reflect.getMetadata(meta.router_prefix, item);
      let options = Reflect.getMetadata(meta.router_class_option, item);
      let router = new Router({
        prefix
      });
      // 插入中间件
      if (options && options.middlewares && options.middlewares.length > 0) {
        router.use(...options.middlewares);
      }
      let controller = new item();
      let prototype = Object.getPrototypeOf(controller);
      const methodsNames = Object.getOwnPropertyNames(prototype).filter(
        item => !isConstructor(item)
      );
      methodsNames.forEach(item => {
        // 创建 router
        let fn = prototype[item];
        let method: string = Reflect.getMetadata(meta.router_method, fn);
        let path = Reflect.getMetadata(meta.router_path, fn);
        let options: RouterOption = Reflect.getMetadata(
          meta.router_options,
          fn
        );
        if (method && path && fn) {
          let middlswares = [];
          if (
            options &&
            options.middlewares &&
            options.middlewares.length > 0
          ) {
            middlswares.push(...options.middlewares);
          }
          router[`${method.toLowerCase()}`](
            `${path}`,
            ...[...middlswares, fn.bind(controller)]
          );
        }
      });
      app.use(router.routes());
    });
  };
}
