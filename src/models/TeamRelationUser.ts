import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  DefaultScope,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  Comment,
  Scopes,
  BeforeCreate,
  Default
} from "sequelize-typescript";
// 队伍人员关联表
@Table({
  tableName: "team_relation_user"
})
export class TeamRelationUser extends Model<TeamRelationUser> {

  // 队伍id
  @AllowNull(false)
  @Column
  teamId: number;

  //人员id
  @AllowNull(false)
  @Column
  teamUserId: number;

  //是否是创建者,0是加入者，1是创建者
  @AllowNull(false)
  @Default("0")
  @Column(DataType.ENUM("0", "1"))
  isCreate: string;

  //职位,1为队长,2为副队长,99为普通球员
  @AllowNull(false)
  @Default("99")
  @Column(DataType.ENUM("1", "2","99"))
  positionType: string;

  // nickname昵称
  @AllowNull(false)
  @Default("")
  @Column
  nickname: string;

  // 用户头像
  @AllowNull(false)
  @Default("")
  @Column
  userHeaderImage: string;

  // 用户头像id
  @AllowNull(false)
  @Default(0)
  @Column
  userHeaderImageId: number;
  static async findAllByUserId(userId: string) {
    return await this.findAll({
      where: {
        teamUserId: userId
      }
    });
  }
  static async findAllByTeamId(teamId:string){
    return await this.findAll({
      where: {
        teamId: teamId
      }
    });
  }
}
