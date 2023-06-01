import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './swagger.js';
import swaggerJsDoc from 'swagger-jsdoc';
import { router as weatherRouter } from './routes/weatherRoute.js';
import { router as farmRouter } from './routes/farmRoute.js';
import { router as growerRouter } from './routes/growerRoute.js';
import { router as sensorRouter } from './routes/sensorRoute.js';
import  { router as userRouter} from './routes/userRoute.js';


// -- UNCOMMENT THE LINES BELOW FOR SERIAL CONNECTION
// -- AND SAVING TO INFLUXDB. CONFIGURE SERIAL PORT IN './config/serial.js'
// import { handleSerialData } from './config/serial.js'
// handleSerialData();

// Connect to MongoDB
import { connectToMongoDB } from './config/mongodb.js';
connectToMongoDB;

// Create Express app instance
const app = express();

// Generate Swagger documentation
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Set up routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Swagger API docs
app.use('/api/weather', weatherRouter); // Weather API routes
app.use('/api/farms', farmRouter); // Farmer API routes
app.use('/api/growers', growerRouter); // Grower API routes
app.use('/api/sensors', sensorRouter); // Sensor API routes
app.use('/api/users', userRouter); // User API routes

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`TinyWather server running on port ${port}`);
    console.log(`Visit http://localhost:${port}/api-docs to view the Swagger API documentation.`);
})
