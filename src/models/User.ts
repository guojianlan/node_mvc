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
  tableName:"user"
})
export class User extends Model<User> {
  @AllowNull(false)
  @Column
  username: string;

  @AllowNull(false)
  @Default("")
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  static async findByUsername(username: string) {
    return await this.findOne({
      where: {
        username
      }
    });
  }
  static async findByPassword(password: string) {
    return await this.findOne({
      where: {
        password
      }
    });
  }
}