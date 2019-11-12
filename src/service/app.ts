import { BaseService } from "./base";
import { Token } from "@models/Token";
import * as utils from "@utils/index";
import { RouterContext } from "koa-router";
import { Image } from "@models/Image";
import {IRedis} from '@libs/redis'
/**
 *
 *
 * @export
 * @class UserService
 */
export class AppService extends BaseService {
  async addToken() {
    let token = utils.createUUid();
    let result = await new Token({ token } as Token).save();
    return this.setData(result.toJSON());
    // 生成token,保存到数据库里，并且记录cookie
  }
  async hasToken(ctx: RouterContext) {}
  static async findImageValue(imageId: string | number, imgSrc?: string) {
    let defaultValue = {
      uri: "",
      id: 0
    };
    if (!utils.isEmpty(imageId)) {
      let imageData = await Image.findByPk(imageId);
      if (!utils.isEmpty(imageData) && imgSrc == imageData.uri) {
        defaultValue.uri = imageData.uri;
        defaultValue.id = imageData.id;
      }
    }
    return defaultValue;
  }
}
