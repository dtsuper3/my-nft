import * as dotenv from "dotenv";

dotenv.config();
const config = {
    MONGO_DB_URL: process.env.MONGO_DB_URI || "",
    PORT: process.env.PORT || "",
}

export {
    config
}