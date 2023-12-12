import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Department } from "../models/departments";

// Create an Express router
const router = express.Router();

// Route to get all Department
router.get("/GetDepartment", async (req: Request, res: Response) => {
  try {
    // Retrieve all Department from the database using the Department model
    const departments = await Department.find();
    // Respond with a JSON array of Departments
    return res.status(200).json(departments);
  } catch (error) {
    // Handle errors if there's an issue fetching Departments
    return res.status(500).json({ "Error fetching Departments": error });
  }
});

// Route to add a new Department
router.post("/AddDepartment", async (req: Request, res: Response) => {
  try {
    // Build a new Department instance using the request body
    const newDepartment = Department.build(req.body);
    // Save the new Department to the database
    const savedDepartment = await newDepartment.save();
    // Respond with a success message and the saved Department data
    return res.status(200).json({ "Department successfully saved": savedDepartment });
  } catch (error) {
    // Handle errors during Department creation or saving
    if (error instanceof mongoose.Error.ValidationError) {
      // If there's a validation error, respond with a 400 status and error message
      return res.status(400).json({ "Validation error": error.message });
    }
    // For other errors, respond with a 500 status and error message
    return res.status(500).json({ "Error saving an Department": error });
  }
});

// router to update Department item
router.put('/UpdateDepartment/:id', async (req: Request, res: Response) => {
  try{
    // find item by id and update them
    const department = await Department.findByIdAndUpdate(req.params.id, req.body);

    const updatedDepartment = await Department.findById(req.params.id)

    // Respond with a success message and the updated Department item
    return res.status(200).json({ 'Department item successfully updated': updatedDepartment });
  } catch (error) {
    // Handle found errors
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      // Respond with a 404 status and not found error message
      return res.status(404).json({ 'Department Id does not found': error });
    }
    // Handle validation errors separately and other errors generically
    else if (error instanceof mongoose.Error.ValidationError) {
      // Respond with a 400 status and validation error message
      return res.status(400).json({ 'Validation error': error.message });
    }

    // Respond with a 500 status and a generic error message for other errors
    return res.status(500).json({ 'Error saving a Department item': error });
  }
});

// Export the router for use in other parts of the application
export { router as departmentsRouter };