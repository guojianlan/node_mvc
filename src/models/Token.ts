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
  tableName:"token"
})
export class Token extends Model<Token> {
  @AllowNull(false)
  @Column
  token: string;
  
  static async findByToken(token:string){
    return await this.findOne({
      where: {
        token
      }
    });
  }
}