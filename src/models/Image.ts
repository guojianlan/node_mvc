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
  Length
} from "sequelize-typescript";
@Table({
  tableName:"image"
})
export class Image extends Model<Image> {
  @AllowNull
  @Column
  hash: string;
  @AllowNull
  @Column
  uri: string;
  @Column
  width: number;
  @Comment("获取图片高度")
  @Column
  height: number;
  @Comment("0为本地1为阿里云")
  @Column(DataType.ENUM("0", "1"))
  type: string;
  /**
   *
   *
   * @static
   * @param {string} hash
   * @returns
   * @memberof Image
   */
  static async findByHash(hash: string) {
    return await this.findOne({
      where: {
        hash
      }
    });
  }
}
