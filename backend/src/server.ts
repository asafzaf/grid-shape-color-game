import express from "express";
import http from "http";
import { Server as IOServer } from "socket.io";
import Redis from "ioredis";
import GameSingleton from "./game/game.singleton";

const PORT = process.env.BACKEND_PORT ? Number(process.env.BACKEND_PORT) : 3000;
const app = express();
const server = http.createServer(app);
const io = new IOServer(server, { cors: { origin: "*" } });

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
});
redis.on("error", (err) => console.error("Redis connection error:", err));
redis.on("connect", () => console.log("Connected to Redis"));

const STATE_KEY = process.env.REDIS_STATE_KEY || "game_state";

let game = GameSingleton.getInstance();

io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);

  socket.emit("state_snapshot", game.getState());

  socket.on("action", ({ cellIndex }) => {
    game.clickCell(cellIndex);
    io.emit("state_snapshot", game.getState());
    socket.emit("action_ack", { ok: !game.getState().isGameOver });
  });

  socket.on("restart", () => {
    game = GameSingleton.resetGame();
    io.emit("state_snapshot", game.getState());
  });

  socket.on("disconnect", () => console.log("Player disconnected:", socket.id));
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));

server.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
