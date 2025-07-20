import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import jwt from "jsonwebtoken";
import MessageModel from "../models/messageModel";

const connectedUsers = new Map<string, string>();

export function setupSocket(server: HTTPServer) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Unauthorized"));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      // @ts-ignore
      socket.userId = decoded.id;
      next();
    } catch {
      return next(new Error("Unauthorized"));
    }
  });

  const userSocketMap = new Map<string, string>();

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId as string;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User ${userId} connected with socket ${socket.id}`);
    }

    socket.on("private_message", ({ to, message, from }) => {
      const targetSocketId = userSocketMap.get(to);
      if (targetSocketId) {
        io.to(targetSocketId).emit("private_message", {
          from,
          message,
        });
      }
    });

    socket.on("disconnect", () => {
      for (const [uid, sid] of userSocketMap.entries()) {
        if (sid === socket.id) {
          userSocketMap.delete(uid);
          break;
        }
      }
    });
  });

  return io;
}
