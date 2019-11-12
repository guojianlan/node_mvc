import {  Image } from "@models/Image";
import { md5 } from "@utils/index";
import { BaseService } from "./base";
/**
 *
 *
 * @export
 * @class ImageService
 */
export class ImageService extends BaseService {
  /**
   *
   *
   * @param {*} file
   * @memberof ImageService
   */
  async uploadImageFormData(file) {
    // 判断是否是有有
    let hash = md5(file.buffer);
    var image = await Image.findByHash(hash);
    if (image != undefined) {
      return image;
    }

    // 创建记录
    // image = new Image({ hash, url: "suibian" } as Image);
    let result = await image.save();
    let data = result.toJSON();
    if ((data as Image).id > 0) {
      return data;
    }
    return undefined;
  }
}
