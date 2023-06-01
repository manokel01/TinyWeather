import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

// Define the structure of the farm object
/**
 * Mongoose schema for farms
 * @typedef {Object} FarmSchema
 * @property {string} farm_code - The farm's unique code
 * @property {number[]} location - The farm's location coordinates
 * @property {string[]} crops - The crops grown on the farm
 * @property {string} grower - The ID of the grower associated with the farm
 */
const farmSchema = new mongoose.Schema({
  // The farm's unique code (required)
  farm_code: {
    type: String,
    required: true,
  },
  // The farm's location coordinates (optional)
  location: {
    type: [Number],
    required: false,
  },
  // The crops grown on the farm (optional)
  crops: {
    type: [String],
    required: false,
  },
  // The ID of the grower associated with the farm (required)
  grower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grower',
    required: true,
  },
}, {
  // The name of the collection in the database
  collection: 'farms',
  // Automatically add "createdAt" and "updatedAt" fields
  timestamps: true,
});

// Apply the unique validator plugin to the schema
farmSchema.plugin(mongooseUniqueValidator);

// Define the Farm model
const Farm = mongoose.model('Farm', farmSchema);

// Export the Farm model
export { Farm, farmSchema };
