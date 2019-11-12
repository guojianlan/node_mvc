const Core = require("@alicloud/pop-core");
import { aliossConfig } from "@config/alioss";
import { redisConfig } from "@config/redis";
import * as utils from "@utils/index";
import { IRedis } from "@libs/redis";
var client = new Core({
  accessKeyId: aliossConfig.accessKeyId,
  accessKeySecret: aliossConfig.accessKeySecret,
  endpoint: "https://dysmsapi.aliyuncs.com",
  apiVersion: "2017-05-25"
});
export class AliOss {
  async sendSms(
    mobile: string | number,
    type: string
  ): Promise<string | number> {
    let redisKey: string, redisTimeOut: string;
    switch (type) {
      case "login":
        redisKey = `${mobile}${redisConfig.codeLoginSuffix}`;
        redisTimeOut = `${redisConfig.codeLoginTimeOut}`;
        break;

      default:
        redisKey = `${mobile}${redisConfig.codeRegisterSuffix}`;
        redisTimeOut = `${redisConfig.codeRegisterTimeOut}`;
        break;
    }
    let redis = IRedis.getInstance();

    let code = await redis.get(redisKey);
    if (!utils.isNil(code)) {
      return code;
    }
    code = this.getCode(4);
    //保存到redis
    if ((await redis.set(redisKey, code, redisTimeOut)).toUpperCase() == "OK") {
      return code;
    }
    return 0;
  }
  async getSmsCodeByRedis(
    mobile: string | number,
    type: string
  ): Promise<string | number> {
    let redisKey = "";
    switch (type) {
      case "login":
        redisKey = `${mobile}${redisConfig.codeLoginSuffix}`;
        break;
      default:
        redisKey = `${mobile}${redisConfig.codeRegisterSuffix}`;
        break;
    }
    let redis = IRedis.getInstance();
    return await redis.get(redisKey);
  }
  getCode(num: number = 0) {
    return (Math.random() + "").substring(2, 2 + num);
  }
}
