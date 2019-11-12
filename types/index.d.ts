import * as Koa from "koa";
import { ResponseInterFace } from "@libs/Response";
interface ServerInterface {
  app: Koa;
  start(): void;
}
declare class Server implements ServerInterface {
  app: Koa;
  constructor();
  start(): void;
}
interface session {
  users: {
    userId: any;
    activeTime: any;
  };
}
// injectResponse的声明
declare module "koa" {
  interface BaseContext {
    injectResponse: ResponseInterFace;
    session: session;
  }
}
export { Server };
