import * as express from "express";
import * as jwt from "jsonwebtoken";
import config from "../config";
import Player from "../models/player";
import bcrypt from "bcrypt";

class PlayerController {
  private static router: null | express.Router = null;
  private static instance: null | PlayerController = null;

  private constructor() {}

  public static getRouter(): express.Router {
    if (
      PlayerController.router === null ||
      PlayerController.instance === null
    ) {
      PlayerController.instance = new PlayerController();
      PlayerController.router = express.Router();

      PlayerController.router.post("/login/", PlayerController.instance.login);
      PlayerController.router.post(
        "/signup/",
        PlayerController.instance.signup
      );
    }

    return PlayerController.router;
  }

  public async login(req: express.Request, res: express.Response) {
    const player0 = req.body;
    const _token = req.get("Authorization") as string;

    let player: any;
    let match = false;

    try {
      jwt.verify(_token, config.jwt_secret);
    } catch {
      player = (
        await Player.findOne({
          where: {
            username: player0.username,
          },
        })
      )?.get();

      match = await bcrypt.compare(player0.password, player?.password ?? "");
    }

    if (_token !== undefined && _token.length !== 0 && !match) {
      player = (
        await Player.findOne({
          where: {
            username: jwt.decode(_token, { json: true })?.username,
          },
        })
      )?.get();
    }

    if (player === null || player === undefined || !match) {
      res.status(400).send("unauthorized");
      return;
    }

    const player2 = {
      username: player.username,
      full_name: player.full_name,
    };

    const token = jwt.sign(player2, config.jwt_secret);

    res.json({
      user: player2,
      token: token,
    });
  }

  public async signup(req: express.Request, res: express.Response) {
    const player = req.body;
    const p = {
      username: player.username,
      full_name: player.full_name,
    };

    await bcrypt.hash(player.password, 10).then((hash) => {
      player.password = hash;
    });

    await Player.create({
      username: player.username,
      password: player.password,
      full_name: player.full_name,
    })
      .then(() => {
        res.json({
          user: p,
          token: jwt.sign(p, config.jwt_secret),
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("something went wrong...");
      });

    // res.end();
  }
}

export default PlayerController;
