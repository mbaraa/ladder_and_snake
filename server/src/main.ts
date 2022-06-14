import express from "express";
import http from "http";
import cors from "cors";
import config from "./config";
import PlayerController from "./controllers/player_controller";
import GameController from "./controllers/game_controller";

const app = express();
app.use(cors()).use(express.json()).use(express.text());

app.use("/player", PlayerController.getRouter());
app.use("/game", GameController.getRouter());

console.log(`starting server at http://localhost:${config.port}`);
const server = http.createServer(app);
server.listen(config.port);
