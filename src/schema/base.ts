export class BaseSchema {
  schema: any;
  errors: any;
  validator(data: any) {
    return new Promise(resolve => {
      this.schema.validate(data, errors => {
        if (errors && errors.length > 0) {
          this.errors = errors;
          resolve(false);
          return false;
        }
        resolve(true);
      });
    });
  }
}

export let pattern = {
  modile: { pattern: /^1[34578][0-9]{9}$/, message: "请输入正确的手机号码" },
  email: {
    pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    message: "请输入正确的邮箱"
  },
  password: {
    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
    message: "请输入6-16位的密码"
  },
  team:{
    nameMax:14
  }
};
