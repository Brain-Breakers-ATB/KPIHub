import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the shape of an EntrantFAQs item
interface EntrantFAQInterface {
  id: number;
  iconSrc: string;
  question: string;
  answer: string;
  link: string;
}

// Define an interface for the Mongoose document
interface EntrantFAQDoc extends Omit<Document, 'id'>, EntrantFAQInterface {}

// Define an interface for the Mongoose model
interface EntrantFAQModelInterface extends Model<EntrantFAQDoc> {
  build(attr: EntrantFAQInterface): EntrantFAQDoc;
}

// Create a Mongoose schema for "EntrantFAQs" documents
const entrantFAQSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  iconSrc: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

// Define a static method to create new "EntrantFAQs" instances
entrantFAQSchema.statics.build = function (attr: EntrantFAQInterface) {
  return new this(attr); // Use 'this' to refer to the model
};

// Create the Mongoose model for "EntrantFAQs" items
const EntrantFAQs = mongoose.model<EntrantFAQDoc, EntrantFAQModelInterface>(
  'entrantfaqs',
  entrantFAQSchema
);

export { EntrantFAQs };
