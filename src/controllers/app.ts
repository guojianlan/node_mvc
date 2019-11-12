import { Controller, Get, Post } from "@decorator/index";
import { RouterContext } from "koa-router";
import { FileService } from "@service/index";
import * as multer from "koa-multer";
import * as utils from "@utils/index";
import { smsFactory } from "@factory/sms/index";
import { SmsSchema } from "@schema/app";
import { IRedis } from "@libs/redis";
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from "graphql";
var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return "world";
        }
      },
      gg: {
        type: GraphQLString,
        resolve() {
          // return setTimeout(() => {
            return '123'
          // }, 3000);
        }
      }
    }
  })
});
var query = "{ gg }";

graphql(schema, query).then(result => {
  // Prints
  // {
  //   data: { hello: "world" }
  // }
  console.log(result);
});

let upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024
  }
});
let multem_fn = (ctx: any) => {
  let multer: any = upload.single("image");
  return new Promise((resolve, reject) => {
    multer(ctx, () => {})
      .then(() => {
        resolve(true);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
@Controller("/api/app")
class App {
  @Post("/upload/image/formData")
  async uploadImageFormData(ctx: RouterContext) {
    await multem_fn(ctx);
    let file = (ctx.req as any).file;
    let fileService = new FileService();
    await fileService.uploadImageFormData(file.buffer);
    console.log(fileService.getData());
    ctx.injectResponse.success(fileService.getData());
  }
  @Get("/sms")
  async getSmsRegister(ctx: RouterContext) {
    let data = utils.normalizeData(["phone", "type"], ctx.query);
    let schema = new SmsSchema();
    if (!(await schema.validator(data))) {
      return ctx.injectResponse.failParameter(schema.errors);
    }
    let sms = await smsFactory.getInstance().sendSms(data.phone, data.type);
    ctx.injectResponse.success({
      code: sms
    });
  }
}
export = App;
