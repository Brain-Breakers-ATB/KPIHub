import mongoose, {Document, Model, Schema} from 'mongoose';

// Define the shape of an Item
interface ItemInterface {
    title: string;
    description: string;
}

// Define an interface for the Mongoose model
interface ItemModelInterface extends Model<ItemDoc> {
    build(attr: ItemInterface): ItemDoc;
}

// Define the shape of an "Item" document
interface ItemDoc extends Document {
    title: string;
    description: string;
}

// Create a Mongoose schema for "Item" documents
const itemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

// Define a static method to create new "Item" instances
itemSchema.statics.build = function (attr: ItemInterface) {
    return new this(attr); // Use 'this' to refer to the model
};

// Create the Mongoose model for "Item" items
const Item = mongoose.model<ItemDoc, ItemModelInterface>("items", itemSchema);

export {Item};
