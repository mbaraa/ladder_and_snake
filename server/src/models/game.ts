import * as seq from "sequelize";
import db from "../db";

const Game = db.define(
  "game",
  {
    id: {
      type: seq.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    player_id: {
      type: seq.INTEGER,
      allowNull: false,
      references: {
        model: "players",
        key: "id",
      },
    },

    player_1_location: {
      type: seq.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    player_2_location: {
      type: seq.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    total_dice_rolls: {
      type: seq.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    current_player: {
      type: seq.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    save_date: {
      type: seq.DATE,
      allowNull: false,
      defaultValue: seq.NOW,
    },
  },
  {
    underscored: true,
  }
);

export default Game;
