import express, { Request, Response } from 'express';
import { EntrantTelegramChannel } from '../models/entranttelegramchannels';

// Create an Express router
const router = express.Router();

// Route to get all EntrantTelegramChannel items
router.get('/Get', async (req: Request, res: Response) => {
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

// Export the router for use in other parts of the application
export { router as entrantTelegramChannelRouter };
