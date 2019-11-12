import * as Koa from "koa";
import * as R from "ramda";
/**
 *  error
 *    message:获取错误的输出
 *    status:获取错误的code
 *    statusCode:获取错误的code
 *    name:获取错误名字
 *    stack:获取错误堆栈
 * @param {*} error
 * @param {Koa.BaseContext} ctx
 */
var errorName = [
  "BadRequest", //400,客户端请求的语法错误，服务器无法理解
  "Unauthorized", //401,请求要求用户的身份认证
  "PaymentRequired", //402,保留，将来使用
  "Forbidden", //403,服务器理解请求客户端的请求，但是拒绝执行此请求
  "NotFound", //404,服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面
  "MethodNotAllowed", //405,客户端请求中的方法被禁止
  "NotAcceptable", //406,服务器无法根据客户端请求的内容特性完成请求
  "ProxyAuthenticationRequired", //407,请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权
  "RequestTimeout", //408,服务器等待客户端发送的请求时间过长，超时
  "Conflict", //409,服务器完成客户端的PUT请求是可能返回此代码，服务器处理请求时发生了冲突
  "Gone", //410,客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置
  "LengthRequired", //411,服务器无法处理客户端发送的不带Content-Length的请求信息
  "PreconditionFailed", //412,客户端请求信息的先决条件错误
  "PayloadTooLarge", //413,由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息
  "URITooLarge", //414,请求的URI过长（URI通常为网址），服务器无法处理
  "UnsupportedMediaType", //415,服务器无法处理请求附带的媒体格式
  "RangeNotSatisfiable", //416,客户端请求的范围无效
  "ExpectationFailed", //417,服务器无法满足Expect的请求头信息
  "InternalServer", //500,服务器内部错误，无法完成请求
  "NotImplemented", //501,服务器不支持请求的功能，无法完成请求
  "BadGateway", //502,作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应
  "ServiceUnavailable", //503,由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中
  "GatewayTimeout", //504,充当网关或代理的服务器，未及时从远端服务器获取请求
  "HTTPVersionNotSupported" //505,服务器不支持请求的HTTP协议的版本，无法完成处理
];
let error = (app: Koa) => {
  app.on("error", (error, ctx: Koa.BaseContext) => {
    console.log(error);
    console.log(error.code);
    console.log(error.name);
    console.log(error.statusCode || error.status);
    ctx.status = error.statusCode || error.status || 500;
    if (R.contains(error.name.replace(/error/gi, ""), errorName)) {
      return (ctx.body = error.name.replace(/error/gi, ""));
    }
    ctx.body = "error";
  });
};
export = error;
