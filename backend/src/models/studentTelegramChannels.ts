import mongoose, {Document, Model, Schema} from 'mongoose';

// Define the shape of the data for a student Telegram channel
interface StudentTelegramChannelInterface {
    name: string;
    imageSrc: string;
    link: string;
}

// Define the shape of the student Telegram channel model with additional methods
interface StudentTelegramChannelModelInterface extends Model<StudentTelegramChannelDoc> {
    build(attr: StudentTelegramChannelInterface): StudentTelegramChannelDoc;
}

// Define the shape of a document for a student Telegram channel
interface StudentTelegramChannelDoc extends Document, StudentTelegramChannelInterface { }

// Create a Mongoose schema for the student Telegram channel entity
const studentTelegramChannelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});

// Add a static method to the schema to create a new student Telegram channel instance
studentTelegramChannelSchema.statics.build = function (attr: StudentTelegramChannelInterface) {
    return new this(attr);
};

// Create the Mongoose model for the student Telegram channel entity
const StudentTelegramChannel = mongoose.model<StudentTelegramChannelDoc,
    StudentTelegramChannelModelInterface>('studenttelegramchannels', studentTelegramChannelSchema);

// Export the StudentTelegramChannel model for use in other parts of the application
export {StudentTelegramChannel};
