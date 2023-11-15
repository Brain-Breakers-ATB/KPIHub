import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the shape of the data for a feedback
interface FeedbackInterface {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  updateAt: Date;
}

// Define the shape of the feedback model with additional methods
interface FeedbackModelInterface extends Model<FeedbackDoc> {
  build(attr: FeedbackInterface): FeedbackDoc;
}

// Define the shape of a document for a feedback
interface FeedbackDoc extends Document, FeedbackInterface {}

// Create a Mongoose schema for the feedback entity
const feedbackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, 
{
  timestamps: true,
});

// Add a static method to the schema to create a new feedback instance
feedbackSchema.statics.build = function (attr: FeedbackInterface) {
  return new this(attr);
};

// Create the Mongoose model for the feedback entity
const Feedback = mongoose.model<FeedbackDoc, FeedbackModelInterface>('feedbacks', feedbackSchema);

// Export the Feedback model for use in other parts of the application
export { Feedback };
