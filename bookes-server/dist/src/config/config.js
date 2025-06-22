import dotenv from "dotenv";
dotenv.config();
export default {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL,
    DB_PASSWORD: process.env.DB_PASSWORD,
};
