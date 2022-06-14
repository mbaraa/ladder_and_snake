import { Sequelize } from "sequelize";
import Game from "src/models/game";
import Player from "src/models/player";
import config from "../config";

const db = new Sequelize({
  database: "the_game",
  host: config.db_host,
  port: 3306,
  username: config.db_user,
  password: config.db_password,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  dialectOptions: {
    socketPath: "/var/run/mysqld/mysqld.sock",
  },
});

db.sync();
// db.authenticate();

export default db;
