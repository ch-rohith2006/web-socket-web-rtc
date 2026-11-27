
import { Server as BunEngine } from "@socket.io/bun-engine";
import { Server as SocketIOServer } from "socket.io";
import { ENV } from "../env.server";

export const io = new SocketIOServer({
  cors: {
    origin: ENV.CORS_ORIGIN,
    credentials: true,
  },
});

export const engine = new BunEngine({
  path: "/socket.io/",
});

io.bind(engine);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", socket.id, reason);
  });
});
