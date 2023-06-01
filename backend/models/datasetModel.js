import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

// Import Mongoose library and unique validator plugin
const Schema = mongoose.Schema;

// Define schema for dataset
const DatasetSchema = new Schema ({
    temperature: {
        type: Number,
        required: false,
    },
    humidity: {
        type: Number,
        required: false,
    },
    pressure: {
        type: Number,
        required: false
    },
    sensorId: {
        type: Schema.Types.ObjectId,
        ref: 'Sensor'
    },
    location: {
        type:  [Number],
        required: false,
        match:[
            coordinateRegex, // Regular expression to match coordinates format
            "Not a valid coordinates format. Try again in demical degress form."
        ]
    },
    battery: {
        type: Number,
        required: false
    },
    timestamp: {
        type: Number,
        required: false
    }
});

// Add unique validator plugin to schema
DatasetSchema.plugin(mongooseUniqueValidator);

// Create model from schema
const Dataset = mongoose.model('Dataset', DatasetSchema);

// Export model
export { Dataset };