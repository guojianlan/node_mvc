let schema = require("async-validator");
import { BaseSchema, pattern } from "./base";
let schemaConfig = {
  phone: [{ required: true, message: "请输入手机号码" }, pattern.modile],
  type: [
    { required: true, message: "请输入业务类型" },
    {
      type: "enum",
      enum: ["login", "register"],
      message: "类型只能是login和register"
    }
  ]
};
let schemaInstance = new schema(schemaConfig);
export class SmsSchema extends BaseSchema {
  schema: any;
  constructor() {
    super();
    this.schema = schemaInstance;
  }
}
