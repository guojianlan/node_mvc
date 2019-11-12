import { Controller, Get, Post } from "@decorator/index";
import { RouterContext } from "koa-router";
import * as multer from "koa-multer";
// import { ImageService } from "@service/index";
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
let index = 1;
class CTX {
  static ctx: string;
}
@Controller("/api/upload")
class Upload {
  @Post("/images/formData")
  async upload_formdata(ctx: RouterContext) {
    try {
      // await multem_fn(ctx);
      let file = (ctx.req as any).file;
      // let userService = new ImageService();
      // let image = await userService.uploadImageFormData(file);
      // console.log(image)
      ctx.req = undefined;
      ctx.body = index;
      // ctx.body = "3333";
    } catch (error) {
      ctx.body = error;
    }
  }
  showMem() {
    var mem = process.memoryUsage();
    var format = function(bytes) {
      return (bytes / 1024 / 1024).toFixed(2) + " MB";
    };
    console.log(
      "Process: heapTotal " +
        format(mem.heapTotal) +
        " heapUsed " +
        format(mem.heapUsed) +
        " rss " +
        format(mem.rss)
    );
    console.log("-----------------------------------------------------------");
  }
}
export = Upload;
