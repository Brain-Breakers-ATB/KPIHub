import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the shape of an EntrantFAQ item
interface EntrantFAQInterface {
  id: string;
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

// Create a Mongoose schema for "EntrantFAQ" documents
const entrantFAQSchema = new Schema({
  id: {
    type: String,
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

// Define a static method to create new "EntrantFAQ" instances
entrantFAQSchema.statics.build = function (attr: EntrantFAQInterface) {
  return new this(attr); // Use 'this' to refer to the model
};

// Create the Mongoose model for "EntrantFAQ" items
const EntrantFAQ = mongoose.model<EntrantFAQDoc, EntrantFAQModelInterface>(
  'entrantfaq',
  entrantFAQSchema
);

export { EntrantFAQ };
