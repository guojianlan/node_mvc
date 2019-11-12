import * as Koa from "koa";
import * as path from "path";
import { loadController } from "@decorator/index";
import * as Router from "koa-router";
var staticCache = require("koa-static-cache");
import * as render from "koa-ejs";
let router = (app: Koa) => {
  render(app, {
    root: path.join(__dirname, "../../views"),
    layout: false,
    viewExt: "html" || "ejs",
    cache: false,
    debug: false
  });
  app.use(
    staticCache(path.join(__dirname, "../../static"), {
      maxAge: 365 * 24 * 60 * 60
    })
  );
  loadController(path.join(__dirname, "../controllers"))(app);
};
export = router;
