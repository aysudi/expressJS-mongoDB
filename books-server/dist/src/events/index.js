import { registerChatEvents } from "./chat.events.js";
export const registerSocketEvents = (socket, io) => {
    registerChatEvents(socket, io);
};
