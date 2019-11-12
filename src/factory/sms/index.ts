import { AliOss } from "./alioss";
interface smsInterface {
  sendSms: (mobile: string | number, type: string) => any;
  getSmsCodeByRedis: (mobile: string | number, type: string) => any;
}

export class smsFactory {
  static _instance: smsInterface = null;
  static getInstance() {
    if (smsFactory._instance == null) {
      return (smsFactory._instance = new AliOss());
    } else {
      return smsFactory._instance;
    }
  }
}
