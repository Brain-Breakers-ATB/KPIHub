import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import { json } from "body-parser";
import { itemsRouter } from "./routes/items.ts";
import { activitiesRouter } from "./routes/activities.ts";
import { studentTelegramChannelRouter } from "./routes/studentTelegramChannels.ts";
import { socialLinksRouter } from "./routes/socialLinks.ts";
import { feedbacksRouter } from "./routes/feedbacks.ts";
import { DB_ENDPOINT, DB_PASSWORD, DB_LOGIN, PORT } from "../config";

// MongoDB connection URL with authentication
const CONNECTION_STRING = `mongodb+srv://${DB_LOGIN}:${DB_PASSWORD}@${DB_ENDPOINT}`;

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON request bodies
app.use(json());

// Mount the itemRouter for handling item-related routes
app.use("/api/items", itemsRouter);

// Mount the activitiesRouter for handling activity-related routes
app.use("/api/activities", activitiesRouter);

// Mount the studentTelegramChannelRouter for handling student Telegram channel-related routes
app.use("/api/studentTelegramChannels", studentTelegramChannelRouter);

// Mount the socialLinksRouter for handling social links-related routes
app.use("/api/socialLinks", socialLinksRouter);

// Mount the feedbacksRouter for handling feedback-related routes
app.use("/api/feedbacks", feedbacksRouter);

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