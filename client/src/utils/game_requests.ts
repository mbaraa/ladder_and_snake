import config from "../config";
import Game from "../models/game";

class GameRequests {
  public static async newGame(): Promise<Game | null> {
    return await fetch(`${config.backendAddress}/game/new/`, {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        Authorization: localStorage.getItem("token") as string,
        accept: "*/*",
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => resp as Game)
      .catch((err) => {
        console.error(err);
        return null;
      });
  }

  public static async saveGame(game: Game): Promise<boolean> {
    return await fetch(`${config.backendAddress}/game/save/`, {
      method: "POST",
      mode: "cors",
      headers: new Headers({
        Authorization: localStorage.getItem("token") as string,
        accept: "*/*",
        "content-type": "application/json",
      }),
      body: JSON.stringify(game),
    })
      .then((resp) => resp.status !== 200)
      .catch((err) => {
        console.error(err);
        return false;
      });
  }

  public static async loadGames(): Promise<Game[] | null> {
    return await fetch(`${config.backendAddress}/game/load/`, {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        Authorization: localStorage.getItem("token") as string,
        accept: "*/*",
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => resp as Game[])
      .catch((err) => {
        console.error(err);
        return null;
      });
  }
}

export default GameRequests;
