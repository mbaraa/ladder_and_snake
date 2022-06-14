import * as express from "express";
import * as jwt from "jsonwebtoken";
import config from "../config";
import Player from "../models/player";
import Game from "../models/game";

class GameController {
  private static router: null | express.Router = null;
  private static instance: null | GameController = null;

  private constructor() {}

  public static getRouter(): express.Router {
    if (GameController.router === null || GameController.instance === null) {
      GameController.instance = new GameController();
      GameController.router = express.Router();

      GameController.router.post("/save/", GameController.instance.saveGame);
      GameController.router.get("/new/", GameController.instance.newGame);
      GameController.router.get("/load/", GameController.instance.loadGames);
    }

    return GameController.router;
  }

  public async newGame(req: express.Request, res: express.Response) {
    const token = req.get("Authorization") as string;

    try {
      jwt.verify(token, config.jwt_secret);
    } catch {
      res.status(400).send("invalid token");
      return;
    }

    if (token.length !== 0) {
      const fetchedPlayer = (
        await Player.findOne({
          where: {
            username: jwt.decode(token, { json: true })?.username,
          },
        })
      )?.get();

      const createdGame = await Game.create({
        player_id: fetchedPlayer.id,
      });

      res.json({
        id: (createdGame as any).id,
        player_id: (createdGame as any).player_id,
        player_1_location: (createdGame as any).player_1_location,
        player_2_location: (createdGame as any).player_2_location,
        total_dice_rolls: (createdGame as any).total_dice_rolls,
        save_date: (createdGame as any).save_date,
      });

      return;
    }

    res.status(400).send("unauthorized");
  }

  public async saveGame(req: express.Request, res: express.Response) {
    const token = req.get("Authorization") as string;
    const game = req.body;

    console.log(game);

    try {
      jwt.verify(token, config.jwt_secret);
    } catch {
      res.status(400).send("invalid token");
      return;
    }

    if (token.length !== 0) {
      Game.update(
        {
          player_1_location: game.player_1_location,
          player_2_location: game.player_2_location,
          total_dice_rolls: game.total_dice_rolls,
          save_date: new Date().getTime(),
        },
        {
          where: {
            id: game.id,
          },
        }
      );

      res.status(200);
      return;
    }

    res.status(400).send("unauthorized");
  }

  public async loadGames(req: express.Request, res: express.Response) {
    const token = req.get("Authorization") as string;

    try {
      jwt.verify(token, config.jwt_secret);
    } catch {
      res.status(400).send("invalid token");
      return;
    }

    let player: any;
    if (token.length !== 0) {
      const player = (
        await Player.findOne({
          where: {
            username: jwt.decode(token, { json: true })?.username,
          },
        })
      )?.get();

      const fetchedGames = await Game.findAll({
        where: { player_id: player.id },
      });

      res.json(fetchedGames);
      return;
    }

    res.status(400).send("unauthorized");
  }
}

export default GameController;
