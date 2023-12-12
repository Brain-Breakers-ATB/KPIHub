import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the shape of a Department item
interface IDepartments {
    name: string;
    shortName: string;
    departments: [
        {
            fullName: string;
            shortName: string;
        }
    ];
}

// Define an interface for the Mongoose model
interface IDepartmentsModel extends Model<DepartmentsDoc>{
    build(attr: IDepartments): DepartmentsDoc;
}

// Define the shape of a "Department" document
interface DepartmentsDoc extends Document {
    name: string;
    shortName: string;
    departments: [
        {
            fullName: string;
            shortName: string;
        }
    ];
}

// Create a Mongoose schema for "Department" documents
const departmentsSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    shortName: {
        type: String,
        require: true,
    },
    departments: [
        {
            fullName: {
                type: String,
                require: true,
            },
            shortName: {
                type: String,
                require: true,
            }
        }
    ]
})

// Define a static method to create new "Department" instances
departmentsSchema.statics.build = function(attr: IDepartments){
    return new this(attr);
}

// Create the Mongoose model for "Department" items
const Department = mongoose.model<DepartmentsDoc, IDepartmentsModel>("departments", departmentsSchema);

export { Department };