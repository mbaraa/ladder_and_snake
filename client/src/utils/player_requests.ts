import config from "../config";
import Player from "../models/player";

class PlayerRequests {
  public static async login(player: Player): Promise<Player | null> {
    return await fetch(`${config.backendAddress}/player/login/`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(player),
      headers: new Headers({
        "content-type": "application/json",
        accept: "*/*",
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        localStorage.setItem("token", resp.token);
        return resp.player as Player;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  }

  public static async loginWithToken(): Promise<Player | null> {
    return await fetch(`${config.backendAddress}/player/token-login/`, {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        Authorization: localStorage.getItem("token") as string,
        accept: "*/*",
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        return resp.player as Player;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  }

  public static async signup(player: Player): Promise<Player | null> {
    return await fetch(`${config.backendAddress}/player/signup/`, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(player),
      headers: new Headers({
        "content-type": "application/json",
        accept: "*/*",
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        localStorage.setItem("token", resp.token);
        return resp.player as Player;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  }
}

export default PlayerRequests;
