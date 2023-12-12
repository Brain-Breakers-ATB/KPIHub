import express, {Request, Response} from "express";
import mongoose from "mongoose";
import {Item} from "../models/items";

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
        return res.status(500).json({"Error fetching items": error});
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
        return res.status(200).json({"Item successfully saved": savedItem});
    } catch (error) {
        // Handle errors during item creation or saving
        if (error instanceof mongoose.Error.ValidationError) {
            // If there's a validation error, respond with a 400 status and error message
            return res.status(400).json({"Validation error": error.message});
        }
        // For other errors, respond with a 500 status and error message
        return res.status(500).json({"Error saving an item": error});
    }
});

// router to update Item
router.put('/UpdateItem/:id', async (req: Request, res: Response) => {
    try {
        // find item by id and update them
        const item = await Item.findByIdAndUpdate(req.params.id, req.body);

        const updatedItem = await Item.findById(req.params.id)

        // Respond with a success message and the updated Item
        return res.status(200).json({'Item item successfully updated': updatedItem});
    } catch (error) {
        // Handle found errors
        if (error instanceof mongoose.Error.DocumentNotFoundError) {
            // Respond with a 404 status and not found error message
            return res.status(404).json({'Item Id does not found': error});
        }
        // Handle validation errors separately and other errors generically
        else if (error instanceof mongoose.Error.ValidationError) {
            // Respond with a 400 status and validation error message
            return res.status(400).json({'Validation error': error.message});
        }

        // Respond with a 500 status and a generic error message for other errors
        return res.status(500).json({'Error saving a Item item': error});
    }
});

// Export the router for use in other parts of the application
export {router as itemsRouter};
