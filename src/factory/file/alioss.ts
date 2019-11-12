import { aliossConfig } from "@config/alioss";
const alioss = require("ali-oss");
import * as path from "path";
import * as utils from "./utils";
var store = alioss(aliossConfig);
export class AliOss {
  async saveFile(
    file: any,
    assets_path: string,
    mimetype: string
  ): Promise<string> {
    try {
      let file_path = path.join(
        assets_path,
        `${utils.randomName()}.${mimetype}`
      );
      await store.put(file_path, file);
      return file_path;
    } catch (error) {
      throw error;
    }
  }
}
