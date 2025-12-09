import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import { Server as IOServer } from "socket.io";
import { swaggerUi, swaggerSpec } from "./swagger.js";
import questionRoutes from "./routes/questions.js";
import authRoutes from "./routes/auth.js";
import profileRoute from "./routes/profile.js";
import postRoutes from "./routes/posts.js";

dotenv.config();
const app = express();

const allowedOrigins = ["http://localhost:3000", "https://devvhubb.vercel.app"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB Error:", err));

const server = http.createServer(app);

const io = new IOServer(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "*",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/questions", questionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoute);
app.use("/api/posts", postRoutes);
app.get("/", (req, res) => res.send("Server is up and running!"));

const PORT = process.env.PORT || 8080;
server.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
