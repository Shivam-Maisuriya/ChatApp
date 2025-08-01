import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoute from './routes/user.route.js'
import messageRoute from './routes/message.route.js'
import cookieParser from 'cookie-parser'
import { app, server } from './SocketIO/server.js'

dotenv.config()

// Middleware to parse JSON bodies
app.use(express.json()) 
app.use(cookieParser()) 
app.use(cors())

const PORT = process.env.PORT || 3000
const URI = process.env.MONGODB_URI

// Connect to MongoDB
try {
    mongoose.connect(URI)
    console.log('Connected to MongoDB')
} catch (error) {
    console.log(error);    
}

// routes
app.use("/api/user", userRoute)
app.use("/api/message", messageRoute)

server.listen(PORT, () => {
  console.log(`Server is running  on port ${PORT}`)
})
