import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import { disconnect } from 'process';

const app = express()
const server = http.createServer(app);
// used to create a server for socket.io
const io = new Server(server, {
    cors: {
        origin : "http://localhost:3001",
        methods: ["GET", "POST"]
    }
})

// realtime message code goes here
export const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
}

const users = {}

// use to listen events on server side 
io.on( "connection", (socket) => {
    console.log("socket user connected", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId) {
        users[userId] = socket.id;
        console.log("online : ",users);
    }

    // use to send the events to all connected clients/users 
    socket.emit("getOnlineUsers", Object.keys(users));

    // use to listen client side events emitted by the server side (server & client)
    socket.on("disconnect", () => {
        console.log("socket user disconnected", socket.id);
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users)); 
    })
})

export {app, server, io};

