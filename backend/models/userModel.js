import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

// Define the user schema with required fields
const userSchema = new Schema({
  // Username is required, must be unique, and can't exceed 100 characters
  username: {
    type: String, 
    required: [true, 'Username is a required field'], 
    max: 100, 
    unique: true,
    trim: true,
    lowercase: true, 
  },
  // First name is required and can't exceed 100 characters
  firstname: {
    type: String, 
    required: [true, 'First name is a required field'], 
    max: 100
  },
  // Last name is required and can't exceed 100 characters
  lastname: {
    type: String, 
    required: [true, 'Last name is a required field'], 
    max: 100
  },
  // Email is required, must be unique, can't exceed 100 characters, and must match an email pattern
  email: {
    type: String, 
    required: [true, 'Email is a required field'], 
    max: 100, 
    unique: true,
    trim: true,
    lowercase: true, 
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Email address is not valid',
    ],
  },
  // Password is required and can't exceed 100 characters
  password: {
    type: String, 
    required: [true, 'Password is a required field'], 
    max: 100
  }
},
{ 
  // Set collection name and add timestamps to user schema
  collection: 'users',
  timestamps: true 
});

// Add unique validator plugin to user schema
userSchema.plugin(uniqueValidator);

// Create User model with user schema
const User = mongoose.model('User', userSchema);

// Export User model for use in other modules
export { User };
