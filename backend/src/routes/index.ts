import express from "express";
import nftRouter from "./nftRoute";

const router = express.Router();

router.use("/nfts", nftRouter)

export default router;