import { createServer } from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectToDb from "./db/db.js";

const server = createServer(app);

const PORT = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});


io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join-space", (spaceId) => {
    socket.join(spaceId);
    console.log(`User joined space: ${spaceId}`);
  })

  socket.on("send-message", ({spaceId, message}) => {
    io.to(spaceId).emit("receive-message", message)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected")
  })
});

connectToDb()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the process if database connection fails
  });