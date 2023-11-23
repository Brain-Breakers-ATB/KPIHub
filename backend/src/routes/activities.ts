import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Activity } from "../models/activities"; // Assuming you have an 'Activity' model

// Create an Express router
const router = express.Router();

// Route to get all activities
router.get("/GetActivity", async (req: Request, res: Response) => {
  try {
    // Retrieve all activities from the database using the Activity model
    const activities = await Activity.find();
    // Respond with a JSON array of activities
    return res.status(200).json(activities);
  } catch (error) {
    // Handle errors if there's an issue fetching activities
    return res.status(500).json({ "Error fetching activities": error });
  }
});

// Route to add a new activity
router.post("/AddActivity", async (req: Request, res: Response) => {
  try {
    // Build a new activity instance using the request body
    const newActivity = Activity.build(req.body);
    // Save the new activity to the database
    const savedActivity = await newActivity.save();
    // Respond with a success message and the saved activity data
    return res.status(200).json({ "Activity successfully saved": savedActivity });
  } catch (error) {
    // Handle errors during activity creation or saving
    if (error instanceof mongoose.Error.ValidationError) {
      // If there's a validation error, respond with a 400 status and error message
      return res.status(400).json({ "Validation error": error.message });
    }
    // For other errors, respond with a 500 status and error message
    return res.status(500).json({ "Error saving an activity": error });
  }
});

// router to update activity item
router.put('/UpdateActivity/:id', async (req: Request, res: Response) => {
  try{
    // find item by id and update them
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body);

    const updatedActivity = await Activity.findById(req.params.id)

    // Respond with a success message and the updated activity item
    return res.status(200).json({ 'Activity item successfully updated': updatedActivity });
  } catch (error) {
    // Handle found errors
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      // Respond with a 404 status and not found error message
      return res.status(404).json({ 'Activity Id does not found': error });
    }
    // Handle validation errors separately and other errors generically
    else if (error instanceof mongoose.Error.ValidationError) {
      // Respond with a 400 status and validation error message
      return res.status(400).json({ 'Validation error': error.message });
    }

    // Respond with a 500 status and a generic error message for other errors
    return res.status(500).json({ 'Error saving a Activity item': error });
  }
});

// Export the router for use in other parts of the application
export { router as activitiesRouter };
