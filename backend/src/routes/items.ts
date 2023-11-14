import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Item } from "../models/items";

// Create an Express router
const router = express.Router();

// Route to get all items
router.get("/GetItems", async (req: Request, res: Response) => {
  try {
    // Retrieve all items from the database using the Item model
    const items = await Item.find();
    // Respond with a JSON array of items
    return res.status(200).json(items);
  } catch (error) {
    // Handle errors if there's an issue fetching items
    return res.status(500).json({ "Error fetching items": error });
  }
});

// Route to add a new item
router.post("/AddItem", async (req: Request, res: Response) => {
  try {
    // Build a new item instance using the request body
    const newItem = Item.build(req.body);
    // Save the new item to the database
    const savedItem = await newItem.save();
    // Respond with a success message and the saved item data
    return res.status(200).json({ "Item successfully saved": savedItem });
  } catch (error) {
    // Handle errors during item creation or saving
    if (error instanceof mongoose.Error.ValidationError) {
      // If there's a validation error, respond with a 400 status and error message
      return res.status(400).json({ "Validation error": error.message });
    }
    // For other errors, respond with a 500 status and error message
    return res.status(500).json({ "Error saving an item": error });
  }
});

// Export the router for use in other parts of the application
export { router as itemsRouter };
