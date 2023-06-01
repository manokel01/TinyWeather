import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

// Regular expression to validate email addresses
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Subschema for address
const addressSchema = new Schema({
  street: {
    type: String,
    required: false,
    max: 100
  },
  postcode: {
    type: String,
    required: false,
    max: 100
  },
  country: {
    type: String,
    required: false,
    max: 100
  }
}, { _id : false });

// Main schema for growers
const growerSchema = new Schema({
  firstName: {
    type: String,
    required: false,
    max: 100
  },
  lastName: {
    type: String,
    required: false,
    max: 100
  },
  email: {
    type: String, 
    required: [true, 'Email is a required field'], 
    max: 100, 
    unique: true,
    trim: true,
    lowercase: true, 
    match: [EMAIL_REGEX, "Please provide a valid email address"],
  },
  phone: { 
    type: Number, 
    required: false,
  },
  address : addressSchema,
  password: {
    type: String, 
    required: [true, 'Password is a required field'], 
    max: 100
  },
}, { 
  collection: 'growers', // Name of the MongoDB collection
  timestamps: true // Adds createdAt and updatedAt fields
});

// Adds the mongoose-unique-validator plugin
growerSchema.plugin(mongooseUniqueValidator);

// Creates the Grower model based on the schema
const Grower = mongoose.model('Grower', growerSchema);

// Exports the Grower model and the address schema
export { Grower, addressSchema };
