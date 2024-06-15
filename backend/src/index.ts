import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { config } from "../config";
import appRouter from "./routes";

const app = express();

app.use(express.json());
app.use("/api/v1", appRouter);


mongoose.connect(config.MONGO_DB_URL)
    .then(con => console.log("Mongo connected"))
    .catch(err => console.log(err));

app.listen(config.PORT, () => {
    console.log("Server is running!");
})