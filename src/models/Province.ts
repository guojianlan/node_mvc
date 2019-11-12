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
  tableName: "province"
})
export class Province extends Model<Province> {
  @AllowNull(false)
  @Column
  name: string;
  @AllowNull(false)
  @Column({
    type: DataType.BIGINT({ length: 12 })
  })
  provinceId: number;
}
