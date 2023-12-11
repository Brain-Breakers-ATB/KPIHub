import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import {StudentTelegramChannel} from '../models/studentTelegramChannels';

const router = express.Router();

// Route to get all student Telegram channels
router.get('/GetStudentTelegramChannel', async (req: Request, res: Response) => {
    try {
        // Fetch all student Telegram channels from the database
        const channels = await StudentTelegramChannel.find();
        return res.status(200).json(channels);
    } catch (error) {
        // Handle errors if any occur during the retrieval of student Telegram channels
        return res.status(500).json({'Error fetching student Telegram channels': error});
    }
});

// Route to add a new student Telegram channel
router.post('/AddStudentTelegramChannel', async (req: Request, res: Response) => {
    try {
        // Create a new student Telegram channel instance with the data from the request body
        const newChannel = StudentTelegramChannel.build(req.body);

        // Save the new student Telegram channel to the database
        const savedChannel = await newChannel.save();

        // Respond with a success message and the saved student Telegram channel
        return res.status(200).json({'Student Telegram Channel successfully saved': savedChannel});
    } catch (error) {
        // Handle validation errors separately and other errors generically
        if (error instanceof mongoose.Error.ValidationError) {
            // Respond with a 400 status and validation error message
            return res.status(400).json({'Validation error': error.message});
        }

        // Respond with a 500 status and a generic error message for other errors
        return res.status(500).json({'Error saving a student Telegram channel': error});
    }
});

// router to update StudentTelegramChannel item
router.put('/UpdateStudentTelegramChannel/:id', async (req: Request, res: Response) => {
    try {
        // find item by id and update them
        const studentTelegramChannel = await StudentTelegramChannel.
        findByIdAndUpdate(req.params.id, req.body);

        const updatedStudentTelegramChannel = await StudentTelegramChannel.
        findById(req.params.id)

        // Respond with a success message and the updated StudentTelegramChannel item
        return res.status(200).json({'StudentTelegramChannel item successfully updated':
          updatedStudentTelegramChannel});
    } catch (error) {
        // Handle found errors
        if (error instanceof mongoose.Error.DocumentNotFoundError) {
            // Respond with a 404 status and not found error message
            return res.status(404).json({'StudentTelegramChannel Id does not found': error});
        }
        // Handle validation errors separately and other errors generically
        else if (error instanceof mongoose.Error.ValidationError) {
            // Respond with a 400 status and validation error message
            return res.status(400).json({'Validation error': error.message});
        }

        // Respond with a 500 status and a generic error message for other errors
        return res.status(500).json({'Error saving a StudentTelegramChannel item': error});
    }
});


// Export the router to be used in other parts of the application
export {router as studentTelegramChannelRouter};
