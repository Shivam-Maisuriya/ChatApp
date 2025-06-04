import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function Chatuser() {

  const { selectedConversation } = useConversation()
  // console.log("Selected Conversation: ", selectedConversation);

  // to check if the user is online
  const { socket, onlineUsers } = useSocketContext()
  const isOnline = onlineUsers.includes(selectedConversation._id);

  // or 
  // const getOnlineUsersStatus = (userId) => {
  //   return onlineUsers.includes(userId) ? "online" : "offline";
  // }

  return (
    <div className="flex space-x-3 h-[8vh] items-center justify-center bg-gray-800 hover:bg-gray-700 duration-300 ">
      <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
        <div className="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
        </div>
      </div>
      <div>
        <h1 className="text-xl">  {selectedConversation.fullname}  </h1>
        <span className="text-sm">{isOnline ? "online" : "offline"}</span>
      </div>
    </div>
  );
}

export default Chatuser;
