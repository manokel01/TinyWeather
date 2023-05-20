import * as fs from 'fs';
import { handleSerialData } from './config/serial.js'

// Create a writable stream to JSON file
const outputStream = fs.createWriteStream('serialdata.json', {flags: 'a'});

// handle the incmoing serial data
handleSerialData(outputStream);