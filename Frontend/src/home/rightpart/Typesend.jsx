import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage(); // method for sending messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessages(message);
    setMessage(""); // Clear the input field after sending the message
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[8vh] items-center bg-gray-800 pt-2 pb-2">
        <div className="w-[80%] md:w-[90%] mx-4">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border rounded-xl w-full outline-none px-4 py-2 "
          />
        </div>
        <button>
          <IoSend className="text-3xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
