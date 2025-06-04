import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../SocketIO/server.js";

// Function to send a message
export const sendMessage = async (req, res) => {
  // console.log("message send ", req.params.id, req.body.message);
  try {
    const { message } = req.body; // or const message = req.body.message;
    const { id: receiverId } = req.params; // or const id = req.params.id;
    const senderId = req.user._id; // current logged in user

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // Create a new conversation if it doesn't exist
      conversation = await Conversation.create({
        members: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (!newMessage) {
      return res.status(400).json({ error: "Message creation failed" });
    }

    if (newMessage) {
      // Add the new message to the conversation
      conversation.messages.push(newMessage._id);
    }

    // await newMessage.save();  // Save the new message to the database
    // await conversation.save(); // Save the updated conversation

    // Save both the new message and the updated conversation parallelly
    await Promise.all([newMessage.save(), conversation.save()]); 

    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
      // Emit the new message to the receiver if they are online
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    
    return res.status(200).json({
      newMessage
    });
  } catch (error) {
    console.log("Error in sendMessage : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get messages for a conversation
export const getMessage = async (req, res) => {
  try {

    const { id: chatUser } = req.params;    // jiske sath chat ho rai he or receiverId
    const senderId = req.user._id;          // current logged in user

    let conversation = await Conversation.findOne({
        members: { $all: [senderId, chatUser] },
    }).populate( "messages" ); // populate is use to get actual data of messages instead of just their ids
    
    if( !conversation ){
        return res.status(200).json([]); // If no conversation found, return an empty array
    }

    const mesaages = conversation.messages
    res.status(200).json(mesaages); // Return the messages of the conversation

  } catch (error) {
    console.log("Error in getMessage : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
