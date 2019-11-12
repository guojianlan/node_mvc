export interface Base {
  error_msg?: string;
  error_code?: string | number;
  data: any;
  getErrorMsg: () => string;
  getErrorCode: () => string | number;
  getData: () => boolean;
  setWrong: () => boolean;
}
export class BaseService implements Base {
  error_msg?: string;
  error_code?: string | number;
  data: any;
  [proName: string]: any;
  getErrorMsg() {
    return this.error_msg;
  }
  getData() {
    return this.data;
  }
  getErrorCode() {
    return this.error_code;
  }
  setData(data: any) {
    this.data = data;
    return true;
  }
  setWrong(error_code: number | string = 0, error_msg: string = "") {
    this.error_msg = error_msg;
    this.error_code = error_code;
    return false;
  }
}
