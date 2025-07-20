export const registerChatEvents = (socket, io) => {
    socket.on("send_message", (data) => {
        console.log("📩 Message received:", data);
        io.emit("receive_message", data);
    });
    socket.on("disconnect", () => {
        console.log(`❌ Socket disconnected: ${socket.id}`);
    });
};
