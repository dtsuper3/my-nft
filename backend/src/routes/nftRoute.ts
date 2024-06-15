import express from "express";
import { nftControllers } from "../controllers/nftControllers";

const router = express.Router();

router
    .get("/top-5-nfts", nftControllers.aliasTopNFTs, nftControllers.getAllNFTs);

router.get("/stats", nftControllers.getNFTsStats);

router.get("/monthly-plan/:year", nftControllers.getMonthlyPlan);

router.get("/", nftControllers.getAllNFTs);
router.post("/", nftControllers.createNFT);

router.get("/:id", nftControllers.getNFTById);
router.put("/:id", nftControllers.updateNFT);
router.delete("/:id", nftControllers.deleteNFT);


export default router;