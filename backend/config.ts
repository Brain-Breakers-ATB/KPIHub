import * as dotenv from "dotenv";

dotenv.config();

export const DB_ENDPOINT = process.env.DB_ENDPOINT;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_LOGIN = process.env.DB_LOGIN;
export const PORT = process.env.PORT;
