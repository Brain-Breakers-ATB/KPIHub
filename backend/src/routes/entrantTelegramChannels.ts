import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { EntrantTelegramChannel } from '../models/entrantTelegramChannels.ts';

// Create an Express router
const router = express.Router();

// Route to get all EntrantTelegramChannel items
router.get('/GetEntrantTelegramChannel', async (req: Request, res: Response) => {
  try {
    // Retrieve all EntrantTelegramChannel items from the database using the EntrantTelegramChannel model
    const entrantTelegramChannels = await EntrantTelegramChannel.find();
    // Respond with a JSON array of EntrantTelegramChannel items
    return res.status(200).json(entrantTelegramChannels);
  } catch (error) {
    // Handle errors if there's an issue fetching EntrantTelegramChannel items
    return res.status(500).json({ error: 'Error fetching EntrantTelegramChannel items' });
  }
});

// Route to add a new EntrantTelegramChannel item
router.post('/AddEntrantTelegramChannel', async (req: Request, res: Response) => {
  try {
    // Build a new EntrantTelegramChannel instance using the request body
    const newEntrantTelegramChannel = EntrantTelegramChannel.build(req.body);
    // Save the new EntrantTelegramChannel item to the database
    const savedEntrantTelegramChannel = await newEntrantTelegramChannel.save();
    // Respond with a success message and the saved EntrantTelegramChannel item data
    return res.status(200).json({ message: 'EntrantTelegramChannel item successfully saved', data: savedEntrantTelegramChannel });
  } catch (error) {
    // Handle errors during EntrantTelegramChannel item creation or saving
    return res.status(500).json({ error: 'Error saving EntrantTelegramChannel item' });
  }
});

// router to update entrantTelegramChannel item
router.put('/UpdateEntrantTelegramChannel/:id', async (req: Request, res: Response) => {
  try{
    // find item by id and update them
    const entrantTelegramChannel = await EntrantTelegramChannel.findByIdAndUpdate(req.params.id, req.body);

    const updatedEntrantTelegramChannel = await EntrantTelegramChannel.findById(req.params.id)

    // Respond with a success message and the updated entrantTelegramChannel item
    return res.status(200).json({ 'EntrantTelegramChannel item successfully updated': updatedEntrantTelegramChannel });
  } catch (error) {
    // Handle found errors
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      // Respond with a 404 status and not found error message
      return res.status(404).json({ 'EntrantTelegramChannel Id does not found': error });
    }
    // Handle validation errors separately and other errors generically
    else if (error instanceof mongoose.Error.ValidationError) {
      // Respond with a 400 status and validation error message
      return res.status(400).json({ 'Validation error': error.message });
    }

    // Respond with a 500 status and a generic error message for other errors
    return res.status(500).json({ 'Error saving a EntrantTelegramChannel item': error });
  }
});

// Export the router for use in other parts of the application
export { router as entrantTelegramChannelRouter };
