import express from "express";
import http from "http";
import cors from "cors";
import config from "./config";
import PlayerController from "./controllers/player_controller";

const app = express();
app.use(cors()).use(express.json());

const pc = new PlayerController();
app.post("/user/login/", pc.login);

console.log(`starting server at http://localhost:${config.port}`);
const server = http.createServer(app);
server.listen(config.port);
