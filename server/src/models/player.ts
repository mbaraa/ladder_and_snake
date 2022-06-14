import * as seq from "sequelize";
import db from "../db";
import Game from "./game";

const Player = db.define(
  "player",
  {
    id: {
      type: seq.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    username: {
      type: seq.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: seq.STRING,
      allowNull: false,
    },

    full_name: {
      type: seq.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

Player.hasMany(Game);

export default Player;
