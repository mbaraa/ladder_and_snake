import * as express from "express";
import * as jwt from "jsonwebtoken";
import config from "../config";

class PlayerController {
  public async login(req: express.Request, res: express.Response) {
    const reqBody = req.body;

    const token = jwt.sign(reqBody, config.jwt_secret);

    res.json({
      user: {
        username: reqBody.username,
        full_name: reqBody.full_name,
      },
      token: token,
    });
  }

  public async signup(req: express.Request, res: express.Response) {}
}

export default PlayerController;
