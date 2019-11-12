import { Middleware } from "koa";
import "reflect-metadata";
import { loadController as load } from "./loadController";
import { meta } from "./meta";
export interface ControllerOption {
  priority?: number;
  middlewares?: Middleware[];
}
export interface RouterOption {
  middlewares?: Middleware[];
}
export function Controller(path: string = "", options?: ControllerOption) {
  return function(target: Function): any {
    Reflect.defineMetadata(meta.router_prefix, path, target);
    Reflect.defineMetadata(
      meta.router_class_option,
      Object.assign({ priority: 0 }, options),
      target
    );
  };
}
export function body() {
  return (target, key, descriptor) => {
    descriptor.value["params"] = { body: 12 };
  };
}
const createMappingDecorator = (method: string) => (
  path: string,
  options?: RouterOption
): MethodDecorator => {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(meta.router_path, path, descriptor.value);
    Reflect.defineMetadata(meta.router_method, method, descriptor.value);
    Reflect.defineMetadata(meta.router_options, options, descriptor.value);
  };
};
export const Get = createMappingDecorator("GET");
export const Post = createMappingDecorator("POST");
export const Put = createMappingDecorator("PUT");
export const Del = createMappingDecorator("DEL");
export const All = createMappingDecorator("ALL");
export const loadController = load;
