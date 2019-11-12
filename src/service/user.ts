import { User } from "@models/User";
import { BaseService } from "./base";
import { error } from "@config/error";
import * as utils from "@utils/index";
import { IRedis } from "@libs/redis";
import * as config from "@config/index";
import { smsFactory } from "@factory/sms/index";
/**
 *
 *
 * @export
 * @class UserService
 */
export class UserService extends BaseService {
  async findUserList() {
    return await User.findAll();
  }
  async addUser(mobile: string, password: string, code: string) {
    // 检测验证码时候正确
    let smsCode = await smsFactory
      .getInstance()
      .getSmsCodeByRedis(mobile, "register");
    if (utils.isEmpty(smsCode) || code != smsCode) {
      return this.setWrong(error.codeError[0], error.codeError[1]);
    }
    // 检测用户是否存在，
    let user = await User.findByUsername(mobile);
    if (!utils.isEmpty(user)) {
      return this.setWrong(error.userExistence[0], error.userExistence[1]);
    }
    user = await new User({
      username: mobile,
      password: utils.md5(password)
    } as User);
    let result = await user.save();
    let userJson: any = result.toJSON();
    delete userJson.password;
    return this.setData(userJson);
  }
  async login(mobile: string, password: string) {
    let user = await User.findByUsername(mobile);
    if (utils.isEmpty(user)) {
      return this.setWrong(error.userNoExistence[0], error.userNoExistence[1]);
    }
    // 已存在,查找密码是否正确
    if (user.password != utils.md5(password)) {
      return this.setWrong(
        error.userPasswordError[0],
        error.userPasswordError[1]
      );
    }
    delete user.password;
    return this.setData(user);
  }
  async saveSessId(userId: any) {
    let sessId = utils.createUUid();
    let result = await IRedis.getInstance().hset(
      config.sessIdKey,
      sessId,
      JSON.stringify({ userId, activeTime: +new Date() })
    );
    // if (result != "OK") {
    //   return this.setWrong(0, "保存token失败");
    // }
    return this.setData({
      sessId
    });
  }
}
