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
  tableName: "city"
})
export class City extends Model<City> {
  @AllowNull(false)
  @Column
  name: string;
  @AllowNull(false)
  @Column({
    type: DataType.BIGINT({ length: 12 })
  })
  cityId: number;
  @AllowNull(false)
  @Column({
    type: DataType.BIGINT({ length: 12 })
  })
  provinceId: number;
}
