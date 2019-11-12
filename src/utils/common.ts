import * as crypto from "crypto";
import * as Hashids from "hashids";
import * as R from "ramda";
import * as config from "@config/hashid";
let hashid = new Hashids(config.salt, config.minLength, config.alphabet);
/**
 *
 * @param fn
 * @returns true | false
 */
export let checkFn = (fn: any) => {
  return Object.prototype.toString.call(fn) == "[object Function]";
};
// export let infinite_routes = (file_path: string) => {
//   let dirPath = fs.readdirSync(file_path).filter(item => {
//     return item.indexOf(".js") < 0;
//   });
//   dirPath.forEach((item, index) => {
//     let filePath = path.join(file_path, item + "/index.js");
//     if (fs.existsSync(filePath)) {
//       console.log(filePath);
//     }
//   });
// };

/**
 *
 *
 * @param {string} str
 * @param {string} [salt="5tasd"]
 * @returns {string}
 */
export const md5 = (str: string, salt: string = "5tasd"): string => {
  let md5 = crypto.createHash("md5");
  return md5.update(str + salt).digest("hex");
};

/**
 *
 *
 * @param {string} str
 * @returns {string}
 */
export const sha1 = (str: string): string => {
  let sha1 = crypto.createHash("sha1");
  return sha1.update(str).digest("hex");
};
/**
 *
 *
 * @export
 * @param {string} str
 * @returns {string}
 */
export function hashEncryption(str: string): string {
  return hashid.encode(str);
}
/**
 *
 *
 * @export
 * @param {string} str
 * @returns {string}
 */
export function hashDecrypt(str: string): string {
  return R.defaultTo("")(hashid.decode(str)[0]);
}

export function getRandom(num: number) {
  let random = Math.random();
  return random.toString(16).substring(2, 2 + num);
}
export function createToken() {
  return sha1(`${uuid(true)}`);
}
export function createUUid() {
  return sha1(`${uuid(true)}`);
}

/**
 *
 *
 * @export
 * @param {*} data
 * @returns {boolean}
 *  R.isEmpty([]);          //=> true
 *  R.isEmpty('');          //=> true
 *  R.isEmpty({});          //=> true
 *  R.isNil(null); //=> true
 *  R.isNil(undefined); //=> true
 */
export function isEmpty(data: any): boolean {
  return R.isEmpty(data) || R.isNil(data);
}
/**
 *
 *
 * @export
 * @param {*} data
 * @returns {boolean}
 * R.isNil(null); //=> true
 * R.isNil(undefined); //=> true
 */
export function isNil(data: any): boolean {
  return R.isNil(data);
}
export function uuid(isAddNow?: boolean): string {
  if (isAddNow) {
    let now = +new Date();
    return `${now}-${getRandom(4)}-${getRandom(5)}-${getRandom(4)}-${getRandom(
      6
    )}`;
  } else {
    return `${getRandom(4)}-${getRandom(5)}-${getRandom(4)}-${getRandom(6)}`;
  }
}
