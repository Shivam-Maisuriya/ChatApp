import React, { useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
      setLoading(true);
        try {
          const res = await axios.post(
            `/api/message/send/${selectedConversation._id}`,
            { message }
          );
        //   console.log("/send res.data: ", res.data);
          setMessages([...messages, res.data.newMessage]);
          setLoading(false);
        } catch (error) {
          console.log("Error in sending message: ", error);
          setLoading(false);
        }
    };

  return { loading, sendMessages };
}

export default useSendMessage;
