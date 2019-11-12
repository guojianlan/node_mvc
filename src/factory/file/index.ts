import * as config from "@config/index";
import { Local } from "./local";
import { AliOss } from "./alioss";
interface fileInterface {
  saveFile: (file,assets_path:string,mimetype:string) => Promise<string>
}
export class fileFactory {
  static _instance: fileInterface = null;
  static fileInstance() {
    if (fileFactory._instance == null) {
      switch (config.fileConfig.type) {
        case "alioss":
          return (fileFactory._instance = new AliOss());
        default:
          return (fileFactory._instance = new Local());
      }
    } else {
      return fileFactory._instance;
    }
  }
}
