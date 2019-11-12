import { ParameterizedContext } from "koa";
import { error } from "@config/error";
import { Base as BaseService } from "@service/base";
import service = require("src/service");
// code 返回码
// msg 描述
// data 数据
// status 状态,是否成功（1成功，0失败）
/**
 *
 *
 * @export
 * @interface ResponseInterFace
 */
export interface ResponseInterFace {
  success: (data: any, msg?: string) => void;
  fail: (code?: number | string, msg?: string, data?: any) => void;
  failParameter: (data: any) => void;
  failService: (service: BaseService) => void;
  [propName: string]: any;
}
/**
 *
 *
 * @export
 * @class Response
 * @implements {ResponseInterFace}
 */
export class Response implements ResponseInterFace {
  private ctx: ParameterizedContext;
  constructor(ctx: ParameterizedContext) {
    this.ctx = ctx;
  }
  /**
   *
   *
   * @param {*} [data={}]
   * @param {string} [msg=""]
   * @memberof Response
   */
  success(data: any = {}, msg: string = "") {
    this.sendResponse(data, msg, 1, 0);
  }
  /**
   *
   *
   * @param {number} [code=0]
   * @param {string | number} [msg=""]
   * @param {*} [data={}]
   * @memberof Response
   */
  fail(code: number | string = error.unknown[0], msg: string = error.unknown[1], data: any = {}) {
    this.sendResponse(data, msg, 0, code);
  }
  failService(service: BaseService) {
    this.sendResponse({}, service.getErrorMsg(), 0, service.getErrorCode());
  }
  failParameter(data) {
    this.sendResponse(
      {
        list: data
      },
      error.parameter[1],
      0,
      error.parameter[0]
    );
  }
  sendResponse(data: any, msg: string, status: number, code: string | number) {
    this.ctx.body = {
      data,
      msg,
      status,
      code
    };
  }
}
