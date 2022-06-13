import * as sequelize from "sequelize";
import config from "../config";

const db = new sequelize.Sequelize(
  "the_game",
  config.db_user,
  config.db_password,
  {
    host: config.db_host,
    dialect: "mysql",
  }
);

db.sync();

export default db;
