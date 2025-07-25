import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../context/Authprovider.jsx";
import { io } from "socket.io-client";

const socketContext = createContext();

// it is a hook to use the socket context
export const useSocketContext = () => {
    return useContext(socketContext);
}

export const SocketProvider = ({ children }) => {
  const[socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:3000", {
        query: {
          userId : authUser.user._id,
        },
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return() => socket.close()

    }else{
        if (socket) {
            socket.close();
            setSocket(null);
        }
    }
  }, [authUser]);

  return(
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  )

};
