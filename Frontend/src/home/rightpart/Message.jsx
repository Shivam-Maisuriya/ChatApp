import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp")); // Cookies data which stored at login time
  const itsMe = message.senderId === authUser.user._id; // Check if the message is sent by the current user

  const chatName = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "bg-gray-700";

  // console.log("senderId : ", message.senderId);
  // console.log( "User Id : ", authUser.user._id );

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <div className="p-4">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-white ${chatColor}`}>
            {message.message}
          </div>
          <div className="chat-footer opacity-50">
            { formattedTime }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
