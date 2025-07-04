import express from "express";
import "reflect-metadata";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/authRoutes";
import podcastRoutes from "./routes/podcastRoutes";
import episodeRoutes from "./routes/episodeRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/podcasts", podcastRoutes);
app.use("/episodes", episodeRoutes);

export default app;