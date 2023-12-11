import mongoose, {Document, Model, Schema} from 'mongoose';

// Define the shape of an Activity item
interface ActivityInterface {
    title: string;
    description: string;
    iconImgSrc: string;
    imageSrc: string;
    link: string;
}

// Define an interface for the Mongoose model
interface ActivityModelInterface extends Model<ActivityDoc> {
    build(attr: ActivityInterface): ActivityDoc;
}

// Define the shape of an "Activity" document
interface ActivityDoc extends Document, ActivityInterface {
}

// Create a Mongoose schema for "Activity" documents
const activitySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    iconImgSrc: {
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

// Define a static method to create new "Activity" instances
activitySchema.statics.build = function (attr: ActivityInterface) {
    return new this(attr); // Use 'this' to refer to the model
};

// Create the Mongoose model for "Activity" items
const Activity = mongoose.model<ActivityDoc, ActivityModelInterface>("activities",
    activitySchema);

export {Activity, ActivityDoc};
