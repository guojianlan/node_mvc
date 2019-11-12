let schema = require("async-validator");
import { BaseSchema, pattern } from "../base";
let addTeamSchema = new schema({
  name: [
    { required: true, message: "请输入队伍名称" },
    {
      max: pattern.team.nameMax,
      message: `最大不能超过${pattern.team.nameMax}`
    }
  ],
  nickname: [{ required: true, message: "请输入你在队伍的昵称" }]
});
let joinTeamSchema = new schema({
  nickname: [{ required: true, message: "请输入你在队伍的昵称" }]
});
export class TeamSchema extends BaseSchema {
  schema: any;
  constructor(type?: string) {
    super();
    switch (type) {
      case "joinTeam":
        this.schema = joinTeamSchema;
        break;
      default:
        this.schema = addTeamSchema;
        break;
    }
  }
}
