import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext.jsx';
import useConversation from '../zustand/useConversation.js';
import sound from '../assets/notification.mp3';

function useGetSocketMessage() {
  
    const { socket } = useSocketContext();
    const {messages, setMessages} = useConversation() 

    useEffect(() => {
        socket.on("newMessage", (newMessage) => {

            const notificationSound = new Audio(sound);
            notificationSound.play(); 

            setMessages([...messages, newMessage]); 
            // console.log("New message received: ", newMessage);
        });

        return () => {
            socket.off("newMessage"); // Clean up the event listener on unmount
        };

    }, [socket, messages, setMessages])

}

export default useGetSocketMessage