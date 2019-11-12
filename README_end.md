# koa-base基础搭建
强烈依赖module-alias，这个和tsconfig.json配置贼爽
---
## koa相关
---
### koa-router路由
api查看地址
[koa-router](https://www.npmjs.com/package/koa-router)  
具体使用，根据[path-to-regexp](https://github.com/pillarjs/path-to-regexp)查找路由  
```js
let Router = require('koa-router')
let router = new Router({})

router.get().post()
app.use(router.routes())
//路由自动加载代码
import * as Router from "koa-router";
import * as initRouters from '@libs/initRouters'
import * as path from 'path'
let addRouter = function(parentRouter,prefix) {
  let router = new Router({
    prefix:`/${prefix}`
  });
  router.get("/", ctx => {
    ctx.body = "v1/index";
  });
  initRouters(router,path.join(__dirname))
  parentRouter.use(router.routes()).use(router.allowedMethods());
};
export = addRouter;
```
*****
### koa-ejs渲染页面
api查看地址
[koa-ejs](https://www.npmjs.com/package/koa-ejs)  
具体使用
```js
const render = require('koa-ejs');
const path = require('path');
const app = new Koa();
render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'html' || 'ejs',
  cache: false,
  debug: true
});
 
```
*****
### koa-static-cache静态资源,缓存304
api查看地址
[koa-static-cache](https://www.npmjs.com/package/koa-static-cache)  
具体使用
```js
var staticCache = require('koa-static-cache')
 
app.use(staticCache(path.join(__dirname, 'public'), {
  maxAge: 365 * 24 * 60 * 60
}))
```
*****
### koa-static静态资源，没有缓存
api查看地址
[koa-static](https://www.npmjs.com/package/koa-static)  
具体使用
```js
const Koa = require('koa');
const app = new Koa();
app.use(require('koa-static')(root, opts));
```
*****
### koa-multer获取上传方式为multipart/form-data
api查看地址
[koa-multer](https://www.npmjs.com/package/koa-multer)  

[multer](https://www.npmjs.com/package/multer)  
具体使用
```js
const multer = require("koa-multer");
// 存储到内存
let upload = multer({
  storage: multer.memoryStorage(),
  limits: {
      fileSize: $class.config.multer_file_size * 1024 * 1024
  }
});
let multem_fn = (ctx) => {
  let multer = upload.single("image");
  return new Promise((resolve, reject) => {
      multer(ctx, () => { })
          .then(() => {
          resolve(true);
      })
          .catch((err) => {
          reject(err);
      });
  });
};
```
*****
## 数据库相关
### mysql2操作mysql
api查看地址
[mysql2](https://github.com/sidorares/node-mysql2#readme)  
具体使用
```js
const mysql = require('mysql2');
// create the pool
const pool = mysql.createPool({host:'localhost', user: 'root', database: 'test'});
// now get a Promise wrapped instance of that pool
const promisePool = pool.promise();
// query database using promises
const [rows,fields] = await promisePool.query("SELECT 1");
```
*******
### ioredis操作redis
api查看地址
[ioredis](https://github.com/luin/ioredis)  
具体使用
```js
var Redis = require('ioredis');
var redis = new Redis();
redis.set('foo', 'bar');
redis.get('foo', function (err, result) {
  console.log(result);
});
redis.del('foo');
// Or using a promise if the last argument isn't a function
redis.get('foo').then(function (result) {
  console.log(result);
});
```
*******
## 其他相关
### hashids加密解密
api查看地址
[hashids](https://github.com/ivanakimov/hashids.js)  
具体使用
```js
let Hashids = require('hashids')
// 盐值，最小长度，加密的值
let hashid = new Hashids(salt,minLength,alphabet)
hashids.encode(1)
hashids.decode(1)
```
******
### fast-xml-parser转换xml和json
api查看地址
[fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser)  
具体使用
```js
let parser = require('fast-xml-parser')
// xml2json
parser.parse(resp)
let j2xParser = parser.j2xParser;
// json2xml
return new j2xParser({}).parse(obj);
```
******
### request,request-promise请求相关，必须一起安装
api查看地址
[request-promise](https://www.npmjs.com/package/request-promise)
******
### useragent获取浏览器标识
api查看地址
[useragent](https://github.com/3rd-Eden/useragent)
******
### winston日志库，winston-daily-rotate-file日志插件
api查看地址
[winston](https://github.com/winstonjs/winston)  
详细教程
```js
import * as winston from "winston";
import * as path from "path";
import * as DailyRotateFile from "winston-daily-rotate-file";
import * as Koa from 'koa'
const { combine, timestamp, label, printf, json } = winston.format;
//---------------error-stack 日志 --------------------------------
let createErrorStackLogger = function(filepath: string = "") {
  let errStackLogger = winston.createLogger({
    level: "error",
    format: combine(
      label({ label: "error" }),
      timestamp(),
      printf(print => {
        let { level, message, label, timestamp, info } = print;
        info = info
          .replace(/at.+\/node_modules\/.+(\)|\d)/g, "")
          .replace(/(\r\n)|\n/g, "")
          .replace(/at\s+/g, "\n");
        return `${new Date(
          timestamp
        ).toLocaleString()} [${label}] ${level}: ${message}--print: \n ${info}`;
      })
    ),
    transports: [
      new DailyRotateFile({
        filename: path.resolve(filepath,`log/error_stack/%DATE%.log`),
        datePattern: "YYYY-MM-DD",
        zippedArchive: true,
        maxSize: "20m",
        maxFiles: "14d"
      })
    ]
  });
  return errStackLogger;
};

let createLog = (type: string = "debug") => {
  return function(filepath: string = "") {
    let Log = winston.createLogger({
      level: type,
      format: json(),
      transports: [
        new DailyRotateFile({
          filename: path.resolve(filepath,`log/${type}/%DATE%.log`),
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
          maxSize: "20m",
          maxFiles: "14d"
        })
      ]
    });
    return Log;
  };
};
let init = (app: any, filepath: string = "") => {
  app.context.createError = createErrorStackLogger(filepath);
  app.context.requestError = createErrorRequestLogger(filepath)
  let appDebug: any = createLog()(filepath);
  let appError: any = createLog("error")(filepath);
  app.context.$log = (str: any, type: string = "debug") => {
    if (type == "debug") {
      appDebug.log({
        level: "debug",
        message: "debug",
        info: str
      });
    } else {
      appError.log({
        level: "error",
        message: "error",
        info: str
      });
    }
  };
};
let Log = {
  createErrorStackLogger,
  createDeBug: createLog(),
  createError: createLog("error"),
  init: init
};
export = Log;

```
******
### ramda函数式编程库，用于各种操作合并和数据处理
[ramda](https://github.com/ramda/ramda)  
[ramda-阮一峰博客](http://www.ruanyifeng.com/blog/2017/03/ramda.html)  
[ramda中文网](http://ramda.cn/)
******
## 启动相关
### pm2
api查看地址
[pm2](https://github.com/Unitech/pm2)
******

# 项目目录说明
