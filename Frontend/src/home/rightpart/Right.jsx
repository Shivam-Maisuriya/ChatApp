import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import NoChatSelected from "../../components/NoChatSelected.jsx";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className=" w-[70%] bg-slate-900 text-gray-300">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div >
            <Chatuser />
            <div
              className="hide-scrollbar overflow-auto"
              style={{ maxHeight: " calc(92vh - 8vh) " }}
            >
              <Messages />
            </div>
            <Typesend />
          </div>
        </>
      )}
    </div>
  );
}

export default Right;
