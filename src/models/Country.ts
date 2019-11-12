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
  tableName: "country"
})
export class Country extends Model<Country> {
  @AllowNull(false)
  @Column
  name: string;
  @AllowNull(false)
  @Column({
    type: DataType.BIGINT({ length: 12 })
  })
  countryId: number;
  @AllowNull(false)
  @Column({
    type: DataType.BIGINT({ length: 12 })
  })
  cityId: number;
}
