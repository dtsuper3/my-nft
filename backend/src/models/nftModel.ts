import mongoose from "mongoose";
import slugify from "slugify";

const nftSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A NFT must have a name"],
    },
    duration: {
        type: Number,
        required: [true, "must provide duration"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "must hav a group size"]
    },
    difficulty: {
        type: String,
        required: [true, "A NFT must have a difficulty"]
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    price: {
        type: Number,
        required: [true, "A NFT must have a price"]
    },
    priceDiscount: {
        type: Number
    },
    summary: {
        type: String,
        trim: true,
        required: [true, "must provide the summary"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "must provide the summary"]
    },
    imageCover: {
        type: String,
        required: [true, "must provide the cover image"]
    },
    images: [String],
    startDates: [Date],
    slug: String,
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

nftSchema.virtual("durationWeeks").get(function () {    
    return this.duration / 7;
})

nftSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
})

const nft = mongoose.model("nft", nftSchema);

export {
    nft
} 