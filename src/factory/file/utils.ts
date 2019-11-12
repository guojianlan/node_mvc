import * as crypto from "crypto";
export function randomName() {
  let md5 = crypto.createHash("md5");
  return md5
    .update(getRandomStr(6) + +new Date() + getRandomStr(6))
    .digest("hex");
}
export function getRandomStr(num: number): string {
  let strArr = [];
  if (num == 0) {
    strArr.push("");
  }
  while (num >= 1) {
    num--;
    strArr.push(String.fromCharCode(Math.ceil(Math.random() * 25) + 65));
  }
  return strArr.join("");
}
