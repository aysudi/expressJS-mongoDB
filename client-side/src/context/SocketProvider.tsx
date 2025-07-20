import { createContext, useContext, useEffect, useState } from "react";
import { initSocket } from "../lib/socket";

const SocketContext = createContext(false);
export const useSocketReady = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.token) {
      initSocket(user.token);
      setReady(true);
    } else {
      console.warn("❌ No user token in localStorage!");
    }
  }, []);

  return (
    <SocketContext.Provider value={ready}>{children}</SocketContext.Provider>
  );
};
