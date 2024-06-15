import { NextFunction, Request, Response } from "express"
import { nft } from "../models/nftModel"

const nftControllers = {
    getAllNFTs: async (req: Request, res: Response) => {
        try {
            const query = {
                ...(req.query ? req.query : {})
            };
            const excludedFields = ["page", "sort", "limit", "fields"];
            excludedFields.forEach(el => delete query[el]);

            // sorting
            let sortBy = "-createdAt"
            if (req.query.sort) {
                sortBy = (req.query.sort as string).split(',').join(' ');
            }
            let selectFields = "-__v";
            if (req.query.fields) {
                selectFields = (req.query.fields as string).split(', ').join(' ');
            }
            const page = req.query.page ? +req.query.page : 1;
            const limit = req.query.limit ? +req.query.limit : 10;
            const skip = (page - 1) * limit;

            if (req.query.page) {
                const numNFTs = await nft.countDocuments();
                if (skip > numNFTs) throw new Error("Page not found");
            }


            let queryString = JSON.stringify(query);
            queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);



            const data = await nft.find(JSON.parse(queryString))
                .sort(sortBy)
                .select(selectFields)
                .skip(skip)
                .limit(limit);

            res.status(200).json({
                data: {
                    data,
                    totalRecords: data.length
                }
            })
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error
            })
        }
    },
    createNFT: async (req: Request, res: Response) => {
        try {
            const newNFT = await nft.create(req.body)
            res.status(201).json({
                status: "success",
                data: newNFT
            })
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error
            })
        }
    },
    aliasTopNFTs: (req: Request, _res: Response, next: NextFunction) => {
        req.query.limit = "5";
        req.query.sort = "-ratingsAverage,price";
        req.query.fields = "name, price, ratingsAverage, difficulty";
        console.log("aliasTopNFTs", req.query);
        next();
    },
    getNFTById: async (req: Request, res: Response) => {
        try {
            const data = await nft.findById(req.params.id);
            res.status(200).json({
                data,
            })
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error
            })
        }
    },
    updateNFT: async (req: Request, res: Response) => {
        try {
            const newNFT = await nft.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
            res.status(201).json({
                status: "success",
                data: newNFT
            })
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error
            })
        }
    },
    deleteNFT: async (req: Request, res: Response) => {
        try {
            await nft.findByIdAndDelete(req.params.id);
            res.status(201).json({
                status: "success",
            })
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error
            })
        }
    },
    getNFTsStats: async (_req: Request, res: Response) => {
        try {
            const stats = await nft.aggregate([
                {
                    $match: { ratingsAverage: { $gte: 4.5 } }
                },
                {
                    $group: {
                        _id: { $toUpper: "$difficulty" },
                        numNFTs: { $sum: 1 },
                        numRatings: { $sum: "$ratingsQuantity" },
                        avgRating: { $avg: "$ratingsAverage" },
                        avgPrice: { $avg: "$price" },
                        minPrice: { $min: "$price" },
                        maxPrice: { $max: "$price" }                        
                    }
                },
                {
                    $sort: { avgPrice: 1 }
                }
            ]);
            res.status(200).json({
                status: "success",
                data: stats
            })
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error
            })
        }
    },
    getMonthlyPlan: async (req: Request, res: Response) => {
        try {
            const year = +req.params.year;
            const plan = await nft.aggregate([
                {
                    $unwind: "$startDates"
                },
                {
                    $match: {
                        startDates: {
                            $gte: new Date(`${year}-01-01`),
                            $lte: new Date(`${year}-12-31`)
                        }
                    }
                },
                {
                    $group: {
                        _id: { $month: "$startDates" },
                        numNFTStart: { $sum: 1 },
                        nfts: { $push: "$name" }
                    }
                },
                {
                    $addFields: { month: "$_id" }
                },
                {
                    $project: { _id: 0 }
                },
                {
                    $sort: { numNFTStart: -1 }
                }
            ]);
            res.status(200).json({
                status: "success",
                data: plan
            })
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error
            })
        }
    }
}

export {
    nftControllers
}