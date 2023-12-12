import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the shape of a Institute item
interface IInstitutes {
    name: string;
    code: string;
}

// Define an interface for the Mongoose model
interface IInstitutesModel extends Model<InstitutesDoc>{
    build(attr: IInstitutes): InstitutesDoc;
}

// Define the shape of a "Institute" document
interface InstitutesDoc extends Document {
    name: string;
    code: string;
}

// Create a Mongoose schema for "Institute" documents
const institutesSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    code: {
        type: String,
        require: true,
    },
})

// Define a static method to create new "Institute" instances
institutesSchema.statics.build = function(attr: IInstitutes){
    return new this(attr);
}

// Create the Mongoose model for "Institute" items
const Institute = mongoose.model<InstitutesDoc, IInstitutesModel>("institutes", institutesSchema);

export { Institute };