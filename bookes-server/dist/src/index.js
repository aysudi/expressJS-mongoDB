import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectToDB from "./config/db.js";
import { errorHandler } from "./errors/errorHandler.js";
import bookRouter from "./routes/booksRoute.js";
import authorRouter from "./routes/authorRoute.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import sliderRouter from "./routes/sliderRoute.js";
import userRouter from "./routes/userRoute.js";
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
app.use("/auth", userRouter);
app.use(errorHandler);
// A simple test route
app.get("/", (_, res) => {
    res.send("Server is up and running!");
});
connectToDB(app);
