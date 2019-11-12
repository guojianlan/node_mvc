import { BaseService } from "./base";
import { fileFactory } from "@factory/file/index";
import { Image } from "@models/Image";
import { md5 } from "@utils/index";
import * as sizeOf from "image-size";
import * as config from "@config/index";
import * as utils from "@utils/index";
export class FileService extends BaseService {
  async uploadImageFormData(file_buffer: any) {
    // 验证图片是否在数据库
    let hash = md5(file_buffer);
    let image = await Image.findByHash(hash);
    if (image) {
      return this.setData(this.changeDataId(image));
    }
    let imageSize = sizeOf(file_buffer);
    // 上传完成本地文件完成,插入数据库
    // 获取uri信息，上传接口，工厂函数，上传到共有云或者本地,返回资源uri信息
    // 解释图片的大小宽高等。插入数据库
    // 返回图片信息
    let uri = await fileFactory
      .fileInstance()
      .saveFile(file_buffer, "qqb/images", imageSize.type);
    if (uri) {
      // 保存到数据库
      let { width, height } = imageSize;
      let image = new Image({
        uri,
        hash,
        width,
        height,
        type: config.fileConfig.type == "alioss" ? "1" : "0"
      } as Image);
      let result = await image.save();
      this.setData(this.changeDataId(result.toJSON()));
    }
    return false;
  }
  changeDataId(obj: any): any {
    obj.id = utils.hashEncryption(obj.id);
    return obj;
  }
}
