import mongoose, {Document, Model, Schema} from 'mongoose';

// Define the shape of the data for a social link
interface SocialLinkInterface {
    href: string;
    icon: string;
}

// Define the shape of the social link model with additional methods
interface SocialLinkModelInterface extends Model<SocialLinkDoc> {
    build(attr: SocialLinkInterface): SocialLinkDoc;
}

// Define the shape of a document for a social link
interface SocialLinkDoc extends Document, SocialLinkInterface { }

// Create a Mongoose schema for the social link entity
const socialLinkSchema = new Schema({
    href: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
});

// Add a static method to the schema to create a new social link instance
socialLinkSchema.statics.build = function (attr: SocialLinkInterface) {
    return new this(attr);
};

// Create the Mongoose model for the social link entity
const SocialLink = mongoose.model<SocialLinkDoc, SocialLinkModelInterface>('sociallinks',
    socialLinkSchema);

// Export the SocialLink model for use in other parts of the application
export {SocialLink};
