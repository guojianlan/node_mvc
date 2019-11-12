export let error = {
  parameter: ["2001004", "参数为空或格式错误"],
  userExistence: ["2001023", "用户已存在"],
  userNoExistence: ["2001024", "用户不存在"],
  userPasswordError: ["2001025", "你输入密码错误"],
  teamReJoin:['9001001',"你已经在队伍里,请不要重复加入"],
  codeError:["9001002", "验证码错误"],
  unknown:["9999990","发生未知错误"]
};

// length
// code , 2校验，201，20002，3,40004,40300 forbidden,5数据库，9服务层，90001未登录90002登录超时99999
// 1,2,3,4,5.9