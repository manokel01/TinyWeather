import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { writeApi, weatherPoint } from './influxdb.js';
import { Weather } from '../models/weatherModel.js';

// Serial port configuration
const PORT_PATH = '/dev/cu.usbmodem143201';
const BAUD_RATE = 115200;

// Create a serial port instance
const serialPort = new SerialPort({ path: PORT_PATH, baudRate: BAUD_RATE });

// Create parser
const parser = new ReadlineParser({ delimiter: '\r\n' });

// Establish data flow between serial port and emitter
const dataStream = serialPort.pipe(parser);

/**
 * Handle incoming serial data
 */
const handleSerialData = () => {
  let isPortOpen = false;

  // Listen for incoming data from the serial port
  dataStream.on('data', (data) => {
    // Check if port is open
    if (!isPortOpen) {
      console.log('Serial port is open');
      isPortOpen = true;
    }

    try {
      // Parse data as JSON object
      const incomingJSON = JSON.parse(data);

      // Assign JSON values to Weather object
      const { temperature, humidity, pressure, weatherDesc, sensorId, location, battery, timestamp } = incomingJSON;
      const weather = new Weather(temperature, humidity, pressure, weatherDesc, sensorId, location, battery, timestamp);

      // Create an InfluxDB datapoint
      const influxPoint = weatherPoint(weather);

      // Write data to InfluxDB
      writeApi.writePoint(influxPoint);

      // Print incoming data and InfluxDB point to console
      const serverTimestamp = new Date().toISOString();
      console.log(`Server timestamp: ${serverTimestamp}`);
      console.log("Incoming serial data:")
      console.log(`${JSON.stringify(weather)}`);
      console.log("InfluxDB data point:")
      console.log(`${influxPoint}\n `);
    } catch (error) {
      console.log('Error parsing JSON data:', error);
    }
  });
};

export { handleSerialData };
