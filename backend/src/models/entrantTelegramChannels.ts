import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the shape of an EntrantTelegramChannel item
interface EntrantTelegramChannelInterface {
  name: string;
  imgSrc: string;
  link: string;
}

// Define an interface for the Mongoose document
interface EntrantTelegramChannelDoc extends Document, EntrantTelegramChannelInterface {}

// Define an interface for the Mongoose model
interface EntrantTelegramChannelModelInterface extends Model<EntrantTelegramChannelDoc> {
  build(attr: EntrantTelegramChannelInterface): EntrantTelegramChannelDoc;
}

// Create a Mongoose schema for "EntrantTelegramChannel" documents
const entrantTelegramChannelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imgSrc: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

// Define a static method to create new "EntrantTelegramChannel" instances
entrantTelegramChannelSchema.statics.build = function (attr: EntrantTelegramChannelInterface) {
  return new this(attr);
};

// Create the Mongoose model for "EntrantTelegramChannel" items
const EntrantTelegramChannel = mongoose.model<EntrantTelegramChannelDoc, EntrantTelegramChannelModelInterface>(
  'entranttelegramchannels',
  entrantTelegramChannelSchema
);

export { EntrantTelegramChannel };
