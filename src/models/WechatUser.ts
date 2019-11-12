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
  BeforeCreate
} from "sequelize-typescript";
@Table({
  tableName:"wechat_user"
})
export class WechatUser extends Model<WechatUser> {
  @AllowNull(false)
  @Column
  uid:number
  @AllowNull(false)
  @Column
  openid:string
  @AllowNull(false)
  @Column
  unionid:string=""
}