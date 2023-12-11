import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Institute } from "../models/institutes";

// Create an Express router
const router = express.Router();

// Route to get all Institutes
router.get("/GetInstitute", async (req: Request, res: Response) => {
  try {
    // Retrieve all Institutes from the database using the Institute model
    const institutes = await Institute.find();
    // Respond with a JSON array of Institutes
    return res.status(200).json(institutes);
  } catch (error) {
    // Handle errors if there's an issue fetching Institutes
    return res.status(500).json({ "Error fetching Institutes": error });
  }
});

// Route to add a new Institute
router.post("/AddInstitute", async (req: Request, res: Response) => {
  try {
    // Build a new Institute instance using the request body
    const newInstitute = Institute.build(req.body);
    // Save the new Institute to the database
    const savedInstitute = await newInstitute.save();
    // Respond with a success message and the saved Institute data
    return res.status(200).json({ "Institute successfully saved": savedInstitute });
  } catch (error) {
    // Handle errors during Institute creation or saving
    if (error instanceof mongoose.Error.ValidationError) {
      // If there's a validation error, respond with a 400 status and error message
      return res.status(400).json({ "Validation error": error.message });
    }
    // For other errors, respond with a 500 status and error message
    return res.status(500).json({ "Error saving an institute": error });
  }
});

// router to update Institute item
router.put('/UpdateInstitute/:id', async (req: Request, res: Response) => {
  try{
    // find item by id and update them
    const institute = await Institute.findByIdAndUpdate(req.params.id, req.body);

    const updatedInstitute = await Institute.findById(req.params.id)

    // Respond with a success message and the updated Institute item
    return res.status(200).json({ 'Institute item successfully updated': updatedInstitute });
  } catch (error) {
    // Handle found errors
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      // Respond with a 404 status and not found error message
      return res.status(404).json({ 'Institute Id does not found': error });
    }
    // Handle validation errors separately and other errors generically
    else if (error instanceof mongoose.Error.ValidationError) {
      // Respond with a 400 status and validation error message
      return res.status(400).json({ 'Validation error': error.message });
    }

    // Respond with a 500 status and a generic error message for other errors
    return res.status(500).json({ 'Error saving a Institute item': error });
  }
});

// Export the router for use in other parts of the application
export { router as institutesRouter };