import { Server, Socket } from "socket.io";
import { registerChatEvents } from "./chat.events.js";

export const registerSocketEvents = (socket: Socket, io: Server) => {
  registerChatEvents(socket, io);
};
