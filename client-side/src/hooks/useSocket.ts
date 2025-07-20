import { useEffect, useState } from "react";
import { getSocket } from "../lib/socket";

type Message = {
  from: string;
  message: string;
};

export const useChat = (currentUserId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) {
      console.warn("Socket not initialized");
      return;
    }

    const handleReceive = (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [currentUserId]);

  return { messages };
};
