import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { useChat } from "../../hooks/useSocket";
import { useSocketReady } from "../../context/SocketProvider";
import { safeGetSocket } from "../../lib/socket";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const socketRef = useRef<HTMLDivElement | null>(null);
  const currentUserId = "user123";
  const isReady = useSocketReady();

  const { messages } = isReady ? useChat(currentUserId) : { messages: [] };

  if (!isReady) {
    return <div>Connecting to chat...</div>;
  }

  const sendMessage = () => {
    const socket = safeGetSocket();
    if (!socket) {
      console.warn("Socket not available");
      return;
    }

    if (message.trim() !== "") {
      socket.emit("private_message", {
        to: "receiver-id",
        from: currentUserId,
        message,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.scrollTop = socketRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Connecting to chat...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden flex flex-col">
        <div className="bg-blue-900 text-white text-lg font-semibold py-4 px-6">
          💬 Team Chat
        </div>

        <div
          ref={socketRef}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-gray-50"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[75%] px-4 py-2 rounded-lg text-sm shadow-sm ${
                msg.from === currentUserId
                  ? "bg-blue-100 text-blue-900 self-end ml-auto"
                  : "bg-gray-200 text-gray-800 self-start"
              }`}
            >
              {msg.message}
            </div>
          ))}
        </div>

        <div className="flex items-center border-t border-gray-200 px-4 py-3 bg-white">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            className="ml-2 p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
