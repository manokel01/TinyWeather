import { mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// connect to mongoddb database
const mongoConnection = mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'tinyweatherdb' // specify the database name here
});

const connectToMongoDB = mongoConnection.then(() => {
    console.log('Connection to MongoDB successful'); 
  }).catch((error) => {
    console.error(error); 
  });

export { connectToMongoDB }