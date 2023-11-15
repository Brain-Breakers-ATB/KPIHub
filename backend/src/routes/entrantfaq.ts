import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { EntrantFAQ } from "../models/entrantfaq";

// Create an Express router
const router = express.Router();

// Route to get all EntrantFAQ items
router.get("/Get", async (req: Request, res: Response) => {
  try {
    // Retrieve all EntrantFAQ items from the database using the EntrantFAQ model
    const entrantFAQItems = await EntrantFAQ.find();
    // Respond with a JSON array of EntrantFAQ items
    return res.status(200).json(entrantFAQItems);
  } catch (error) {
    // Handle errors if there's an issue fetching EntrantFAQ items
    return res.status(500).json({ "Error fetching EntrantFAQ items": error });
  }
});

// Route to add a new EntrantFAQ item
router.post("/AddEntrantFAQ", async (req: Request, res: Response) => {
  try {
    // Build a new EntrantFAQ instance using the request body
    const newEntrantFAQItem = EntrantFAQ.build(req.body);
    // Save the new EntrantFAQ item to the database
    const savedEntrantFAQItem = await newEntrantFAQItem.save();
    // Respond with a success message and the saved EntrantFAQ item data
    return res.status(200).json({ "EntrantFAQ item successfully saved": savedEntrantFAQItem });
  } catch (error) {
    // Handle errors during EntrantFAQ item creation or saving
    if (error instanceof mongoose.Error.ValidationError) {
      // If there's a validation error, respond with a 400 status and error message
      return res.status(400).json({ "Validation error": error.message });
    }
    // For other errors, respond with a 500 status and error message
    return res.status(500).json({ "Error saving an EntrantFAQ item": error });
  }
});

// Export the router for use in other parts of the application
export { router as entrantFAQRouter };
