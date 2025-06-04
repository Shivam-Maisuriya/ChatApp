import React from 'react'
import { useAuth } from "../context/Authprovider.jsx";

function NoChatSelected() {
  const [authUser] = useAuth();
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-950 ">
        <h1 className="text-center">
          Welcome {" "}
          <span className="font-semibold text-xl">{ authUser.user.fullname }</span>
          <br />
          No chat selected, please select a chat to start messaging.
        </h1>
      </div>
    </>
  );
}

export default NoChatSelected;