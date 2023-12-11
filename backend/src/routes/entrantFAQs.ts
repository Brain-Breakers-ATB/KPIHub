import express, {Request, Response} from "express";
import mongoose from "mongoose";
import {EntrantFAQs} from "../models/entrantFAQs.ts";

// Create an Express router
const router = express.Router();

// Route to get all EntrantFAQs items
router.get("/GetEntrantFAQ", async (req: Request, res: Response) => {
    try {
        // Retrieve all EntrantFAQs items from the database using the EntrantFAQs model
        const entrantFAQItems = await EntrantFAQs.find();
        // Respond with a JSON array of EntrantFAQs items
        return res.status(200).json(entrantFAQItems);
    } catch (error) {
        // Handle errors if there's an issue fetching EntrantFAQs items
        return res.status(500).json({"Error fetching EntrantFAQ items": error});
    }
});

// Route to add a new EntrantFAQs item
router.post("/AddEntrantFAQ", async (req: Request, res: Response) => {
    try {
        // Build a new EntrantFAQs instance using the request body
        const newEntrantFAQItem = EntrantFAQs.build(req.body);
        // Save the new EntrantFAQs item to the database
        const savedEntrantFAQItem = await newEntrantFAQItem.save();
        // Respond with a success message and the saved EntrantFAQs item data
        return res.status(200).json({"EntrantFAQ item successfully saved": savedEntrantFAQItem});
    } catch (error) {
        // Handle errors during EntrantFAQs item creation or saving
        if (error instanceof mongoose.Error.ValidationError) {
            // If there's a validation error, respond with a 400 status and error message
            return res.status(400).json({"Validation error": error.message});
        }
        // For other errors, respond with a 500 status and error message
        return res.status(500).json({"Error saving an EntrantFAQ item": error});
    }
});

// router to update entrantFAQ item
router.put('/UpdateEntrantFAQ/:id', async (req: Request, res: Response) => {
    try {
        // find item by id and update them
        const entrantFAQ = await EntrantFAQs.findByIdAndUpdate(req.params.id, req.body);

        const updatedEntrantFAQ = await EntrantFAQs.findById(req.params.id)

        // Respond with a success message and the updated entrantFAQ item
        return res.status(200).json({'EntrantFAQ item successfully updated': updatedEntrantFAQ});
    } catch (error) {
        // Handle found errors
        if (error instanceof mongoose.Error.DocumentNotFoundError) {
            // Respond with a 404 status and not found error message
            return res.status(404).json({'EntrantFAQ Id does not found': error});
        }
        // Handle validation errors separately and other errors generically
        else if (error instanceof mongoose.Error.ValidationError) {
            // Respond with a 400 status and validation error message
            return res.status(400).json({'Validation error': error.message});
        }

        // Respond with a 500 status and a generic error message for other errors
        return res.status(500).json({'Error saving a EntrantFAQ item': error});
    }
});

// Export the router for use in other parts of the application
export {router as entrantFAQRouter};
