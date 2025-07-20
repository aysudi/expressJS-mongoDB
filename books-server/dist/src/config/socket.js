import { Server } from "socket.io";
import jwt from "jsonwebtoken";
const connectedUsers = new Map();
export function setupSocket(server) {
    const io = new Server(server, {
        cors: { origin: "*" },
    });
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token)
            return next(new Error("Unauthorized"));
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // @ts-ignore
            socket.userId = decoded.id;
            next();
        }
        catch {
            return next(new Error("Unauthorized"));
        }
    });
    const userSocketMap = new Map();
    io.on("connection", (socket) => {
        const userId = socket.handshake.query.userId;
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
