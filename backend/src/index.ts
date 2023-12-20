import express from "express";
import cors from 'cors';
import mongoose from "mongoose";

import { json } from "body-parser";
import { itemsRouter } from "./routes/items.ts";
import { activitiesRouter } from "./routes/activities.ts";
import { studentTelegramChannelRouter } from "./routes/studentTelegramChannels.ts";
import { socialLinksRouter } from "./routes/socialLinks.ts";
import { feedbacksRouter } from "./routes/feedbacks.ts";
import { entrantFAQRouter } from "./routes/entrantFAQs.ts";
import { institutesRouter } from "./routes/institutes.ts";
import { departmentsRouter } from "./routes/departments.ts";

import searchRouter from './routes/search';

import { DB_ENDPOINT, DB_PASSWORD, DB_LOGIN, PORT } from "../config";
import { entrantTelegramChannelRouter } from "./routes/entrantTelegramChannels.ts";

import { rateLimit } from "./RateLimiter/rateLimiter.ts";
import { S3Router } from "./routes/s3Database.ts";
import { imageRateLimit } from "./RateLimiter/imageRateLimiter.ts";

// MongoDB connection URL with authentication
const CONNECTION_STRING = `mongodb+srv://${DB_LOGIN}:${DB_PASSWORD}@${DB_ENDPOINT}`;

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON request bodies
app.use(json());

// Mount the itemRouter for handling item-related routes
app.use("/api/items", rateLimit, itemsRouter);

// Mount the activitiesRouter for handling activity-related routes
app.use("/api/activities", rateLimit, activitiesRouter);

// Mount the studentTelegramChannelRouter for handling student Telegram channel-related routes
app.use("/api/studentTelegramChannels", rateLimit, studentTelegramChannelRouter);

// Mount the socialLinksRouter for handling social links-related routes
app.use("/api/socialLinks", rateLimit, socialLinksRouter);

// Mount the feedbacksRouter for handling feedback-related routes
app.use("/api/feedbacks", rateLimit, feedbacksRouter);

app.use("/api/entrantFAQ", rateLimit, entrantFAQRouter);

app.use("/api/entrantTelegramChannels", rateLimit, entrantTelegramChannelRouter);

app.use("/api/institutes", rateLimit, institutesRouter);

app.use("/api/departments", rateLimit, departmentsRouter);

app.use('/api/search', rateLimit, searchRouter);

app.use('/api/image', imageRateLimit, S3Router);

// Connect to MongoDB
mongoose
    .connect(CONNECTION_STRING)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with an error code
    });

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
