import * as config from "@config/index";
import * as fs from "fs";
import * as path from "path";
import * as utils from "./utils";
export class Local {
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
      await this.saveFilePromise(
        path.join(config.fileConfig.filePath, file_path),
        file
      );
      return file_path;
    } catch (error) {
      throw error;
    }
  }
  saveFilePromise(filePath: string, fileData: any) {
    return new Promise((resolve, reject) => {
      // 块方式写入文件
      const wstream = fs.createWriteStream(filePath);

      wstream.on("open", () => {
        const blockSize = 128;
        const nbBlocks = Math.ceil(fileData.length / blockSize);
        for (let i = 0; i < nbBlocks; i += 1) {
          const currentBlock = fileData.slice(
            blockSize * i,
            Math.min(blockSize * (i + 1), fileData.length)
          );
          wstream.write(currentBlock);
        }

        wstream.end();
      });
      wstream.on("error", err => {
        reject(err);
      });
      wstream.on("finish", () => {
        resolve(true);
      });
    });
  }
}
