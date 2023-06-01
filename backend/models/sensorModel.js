import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { v4 as uuidv4 } from 'uuid'; // to create random UUID key

const Schema = mongoose.Schema;

// regular expression for sensor UUID
// const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const sensorSchema = new Schema({
    uuid: {
        type: String,
        default: uuidv4,
        required: true,
        // match: [
        //     UUID_REGEX,
        //     "Not a valid UUID. Try again."]
        },
    // type of sensor(s), e.g. temperature, humidity
    type: {
        type: [String],
        required: false
    },
    farm: {
        // reference the 'Farm' model
        type: Schema.Types.ObjectId,
        ref: 'Farm',
        required: true
    },
    // the sensor status, e.g. ONLINE, OFFLINE
    status: {
        type: String,
        required: false
    }
});

// Apply mongoose unique validator
sensorSchema.plugin(mongooseUniqueValidator);

// Create Sensor mode to interact with db
const Sensor = mongoose.model('Sensor', sensorSchema)

export { Sensor };