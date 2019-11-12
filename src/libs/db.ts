import {
  Sequelize,
  DataType,
  Model,
  Column,
  Table
} from "sequelize-typescript";
import * as path from "path";
import {dbConfig} from '@config/db'
export const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  models: [path.join(__dirname, "../models")],
  dialect: "mysql",
  pool: {
    max: 4,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    paranoid: true,
    timestamps: true,
    // freezeTableName:true,
    underscored: true
  },
  query: {
    raw: true
  },
  timezone: "+08:00",
  dialectOptions: {
    charset: "utf8",
    collate: "utf8_general_ci"
  }
});
