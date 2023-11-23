import express, { Request, Response } from 'express';
import mongoose from "mongoose";
import { Feedback } from '../models/feedbacks';

const router = express.Router();

// Route to get all feedback items
router.get('/GetFeedback', async (req: Request, res: Response) => {
  try {
    // Fetch all feedback items from the database
    const feedbackItems = await Feedback.find();
    return res.status(200).json(feedbackItems);
  } catch (error) {
    // Handle errors if any occur during the retrieval of feedback items
    return res.status(500).json({ 'Error fetching feedback items': error });
  }
});

// Route to add a new feedback item
router.post('/AddFeedback', async (req: Request, res: Response) => {
  try {
    // Create a new feedback instance with the data from the request body
    const newFeedback = Feedback.build(req.body);
        
    // Save the new feedback item to the database
    const savedFeedback = await newFeedback.save();

    // Respond with a success message and the saved feedback item
    return res.status(200).json({ 'Feedback item successfully saved': savedFeedback });
  } catch (error) {
    // Handle validation errors separately and other errors generically
    if (error instanceof mongoose.Error.ValidationError) {
      // Respond with a 400 status and validation error message
      return res.status(400).json({ 'Validation error': error.message });
    }

    // Respond with a 500 status and a generic error message for other errors
    return res.status(500).json({ 'Error saving a feedback item': error });
  }
});

// router to update feedback item
router.put('/UpdateFeedback/:id', async (req: Request, res: Response) => {
  try{
    // find item by id and update them
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body);

    const updatedFeedback = await Feedback.findById(req.params.id)

    // Respond with a success message and the updated feedback item
    return res.status(200).json({ 'Feedback item successfully updated': updatedFeedback });
  } catch (error) {
    // Handle found errors
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      // Respond with a 404 status and not found error message
      return res.status(404).json({ 'feedback Id does not found': error });
    }
    // Handle validation errors separately and other errors generically
    else if (error instanceof mongoose.Error.ValidationError) {
      // Respond with a 400 status and validation error message
      return res.status(400).json({ 'Validation error': error.message });
    }

    // Respond with a 500 status and a generic error message for other errors
    return res.status(500).json({ 'Error saving a feedback item': error });
  }
});

// Export the router to be used in other parts of the application
export { router as feedbacksRouter };
