import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import avatar from "../../assets/avatar.jpg"

function User({ user }) {
  // Zustand hook to manage the selected conversation
  // Zustand is a state management library for React
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;

  // to check if the user is online
  const { socket, onlineUsers } = useSocketContext()
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={avatar} />
          </div>
        </div>
        <div>
          <h1 className="font-bold"> {user.fullname} </h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
