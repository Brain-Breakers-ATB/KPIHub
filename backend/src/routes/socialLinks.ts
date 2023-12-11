import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import {SocialLink} from '../models/socialLinks';

const router = express.Router();

// Route to get all social links
router.get('/GetSocialLink', async (req: Request, res: Response) => {
    try {
        // Fetch all social links from the database
        const links = await SocialLink.find();
        return res.status(200).json(links);
    } catch (error) {
        // Handle errors if any occur during the retrieval of social links
        return res.status(500).json({'Error fetching social links': error});
    }
});

// Route to add a new social link
router.post('/AddSocialLink', async (req: Request, res: Response) => {
    try {
        // Create a new social link instance with the data from the request body
        const newLink = SocialLink.build(req.body);

        // Save the new social link to the database
        const savedLink = await newLink.save();

        // Respond with a success message and the saved social link
        return res.status(200).json({'Social Link successfully saved': savedLink});
    } catch (error) {
        // Handle validation errors separately and other errors generically
        if (error instanceof mongoose.Error.ValidationError) {
            // Respond with a 400 status and validation error message
            return res.status(400).json({'Validation error': error.message});
        }

        // Respond with a 500 status and a generic error message for other errors
        return res.status(500).json({'Error saving a social link': error});
    }
});

// router to update SocialLink item
router.put('/UpdateSocialLink/:id', async (req: Request, res: Response) => {
    try {
        // find item by id and update them
        const socialLink = await SocialLink.findByIdAndUpdate(req.params.id, req.body);

        const updatedSocialLink = await SocialLink.findById(req.params.id)

        // Respond with a success message and the updated SocialLink item
        return res.status(200).json({'SocialLink item successfully updated': updatedSocialLink});
    } catch (error) {
        // Handle found errors
        if (error instanceof mongoose.Error.DocumentNotFoundError) {
            // Respond with a 404 status and not found error message
            return res.status(404).json({'SocialLink Id does not found': error});
        }
        // Handle validation errors separately and other errors generically
        else if (error instanceof mongoose.Error.ValidationError) {
            // Respond with a 400 status and validation error message
            return res.status(400).json({'Validation error': error.message});
        }

        // Respond with a 500 status and a generic error message for other errors
        return res.status(500).json({'Error saving a SocialLink item': error});
    }
});

// Export the router to be used in other parts of the application
export {router as socialLinksRouter};
