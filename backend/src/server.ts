import express from "express";
import http from "http";
import { Server as IOServer } from "socket.io";
import Redis from "ioredis";
import { GameState } from "shared";

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

const STATE_KEY = "game:state";

async function loadGameState(): Promise<GameState> {
  const data = await redis.get(STATE_KEY);
  if (data) return JSON.parse(data);

  const initState: GameState = {
    board: [],
    rows: 3,
    cols: 6,
    score: 0,
    turn: 0,
    isGameOver: false,
  };

  await redis.set(STATE_KEY, JSON.stringify(initState));
  return initState;
}

app.get("/health", (_req, res) => res.json({ status: "ok" }));

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join", async () => {
    const state = await loadGameState();
    socket.emit("state_snapshot", state);
  });

  socket.on("action", async (payload: { cellIndex: number }) => {
    console.log("Action received:", payload);
    socket.emit("action_ack", { ok: true });
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
