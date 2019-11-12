let schema = require("async-validator");
import { BaseSchema, pattern } from "./base";
let registerSchema = new schema({
  username: [{ required: true, message: "请输入手机号码" }, pattern.modile],
  code: [{ required: true, message: "请输入手机验证码" }],
  password: [
    {
      required: true,
      message: "请输入密码"
    },
    pattern.password
  ]
});
let loginSchema = new schema({
  username: [{ required: true, message: "请输入手机号码" }, pattern.modile],
  password: [
    {
      required: true,
      message: "请输入密码"
    },
    pattern.password
  ]
});
export class UserSchema extends BaseSchema {
  schema: any;
  constructor(type: string) {
    super();
    switch (type) {
      case "register":
        this.schema = registerSchema;
        break;
      case "login":
        this.schema = loginSchema;
        break;
      default:
        this.schema = null;
        break;
    }
  }
}
