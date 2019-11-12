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
@Table({
  tableName:"team"
})
export class Team extends Model<Team> {
  // 队伍名称
  @AllowNull(false)
  @Column
  name: string;
  //队伍所在位置
  @AllowNull(false)
  @Default('')
  @Column
  address: string;
  //队伍头像id
  @AllowNull(false)
  @Column
  headImageId: number;
  //队伍头像
  @AllowNull(false)
  @Default('')
  @Column
  headImage: string;
  //队伍描述
  @AllowNull(false)
  @Default('')
  @Column
  introduction: string;
}