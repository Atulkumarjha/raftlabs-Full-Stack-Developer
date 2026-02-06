import { Server } from "socket.io"
import http from "http"

let io: Server

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: ["https://raftlabs-frontend.vercel.app", "http://localhost:3000"],
    },
  })

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id)

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id)
    })
  })
}

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized")
  }
  return io
}
