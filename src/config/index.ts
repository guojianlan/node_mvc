import * as path from "path";
let config = {
  // activeRouter: ["admin", "v1", ""],
  browserNameKey: "webBrowserName",
  browserCookieMaxAge: 1000 * 60 * 60 * 60 * 24 * 60,
  alter: false,
  fileConfig: {
    type: "local", //local or alioss
    filePath: path.join(__dirname, "../../uploads")
  },
  tokenKey: "qybToken",
  authorizationKey: "passport",
  sessIdKey: "sessIdList",
  cookieMaxAge: 1000 * 60 * 60 * 24 * 30, //毫秒-30天
};
export = config;