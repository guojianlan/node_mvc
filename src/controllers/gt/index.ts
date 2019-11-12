import { Controller, Get, Post } from "@decorator/index";
import { RouterContext } from "koa-router";
import { bodyparser } from "@src/routerMiddlewares/index";
import * as utils from "@utils/index";
let Geetest = require("gt3-sdk");
var click = new Geetest({
  geetest_id: "92e28d27290f0019359ffe9730a8198e",
  geetest_key: "934b04a031323d0c65de11f3fc227480"
});
let clickPromise = function() {
  return new Promise((resolve, reject) => {
    click.register(null, function(err, data) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
let validate = function(data) {
  return new Promise((resolve, reject) => {
    click.validate(
      false,
      {
        geetest_challenge: data.geetest_challenge,
        geetest_validate: data.geetest_validate,
        geetest_seccode: data.geetest_seccode
      },
      function(err, success) {
        if (err) {
          reject(err);
        } else {
          resolve(success);
        }
      }
    );
  });
};
@Controller("/api/gt")
class Gt {
  @Get("/register-click")
  async registerClick(ctx: RouterContext) {
    let result: {
      success: number;
      challenge: string;
      gt: string;
      new_captcha: boolean;
    };
    result = (await clickPromise()) as any;
    return ctx.injectResponse.success(result);
  }
  @Post("/validate-click", {
    middlewares: [bodyparser]
  })
  async validateClick(ctx: RouterContext) {
    let data = utils.normalizeData(
      ["geetest_challenge", "geetest_validate", "geetest_seccode"],
      ctx.request.body
    );
    let result = await validate(data);
    ctx.injectResponse.success({
      result
    });
  }
}
export = Gt;
