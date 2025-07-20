// /lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (token: string) => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      auth: {
        token,
      },
    });

    socket.on("connect", () => {
      console.log("✅ Connected to socket.io server");
    });

    socket.on("disconnect", () => {
      console.log("⚠️ Disconnected from socket.io server");
    });
  }
};

export const getSocket = (): Socket => {
  if (!socket) throw new Error("Socket not initialized");
  return socket;
};

export const safeGetSocket = (): Socket | null => {
  return socket;
};
