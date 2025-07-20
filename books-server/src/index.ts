import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectToDB from "./config/db.js";
import "./config/passport.js";
import { errorHandler } from "./errors/errorHandler.js";
import bookRouter from "./routes/booksRoute.js";
import authorRouter from "./routes/authorRoute.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import sliderRouter from "./routes/sliderRoute.js";
import userRouter from "./routes/userRoute.js";
import passport from "passport";
import googleRouter from "./routes/googleRoute.js";
import githubRouter from "./routes/githubRoute.js";

import http from "http";
import { Server } from "socket.io";
import { registerSocketEvents } from "./events/index.js";

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(limiter);
app.use(helmet());

//route
app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/sliders", sliderRouter);

app.use(passport.initialize());
app.use("/auth", googleRouter);
app.use("/auth", githubRouter);
app.use("/auth", userRouter);

app.use(errorHandler);

// A simple test route
app.get("/", (_, res) => {
  res.send("Server is up and running!");
});

// 🔥 Wrap Express in HTTP server
const server = http.createServer(app);

// 🔌 Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  },
});

// 📦 Load modular socket handlers
io.on("connection", (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);
  registerSocketEvents(socket, io);
});

connectToDB(server);
