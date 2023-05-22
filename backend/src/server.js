import { handleSerialData } from '../middleware/parser.js';
import express from 'express';

// Parse incoming data
handleSerialData();

// Create an Express application
const app = express();
const port = 3000;

// Set up a route for serial interface
app.get('/serial', (req, res) => {
    res.sendFile('serial.html')
})
