import { WeatherData } from "../model/weatherData.js";
import { dataStream } from '../config/serial.js'
import { Point } from '@influxdata/influxdb-client';
import { writeClient } from '../config/influxdb.js'

// Handle serial data
const handleSerialData = () => {
  let isPortOpen = false;

  dataStream.on('data', (data) => {
    if (!isPortOpen) {
      console.log('Serial port is open');
      isPortOpen = true;
    }
    try {
      // Parse data as JSON object
      const jsonData = JSON.parse(data);
      // print incoming data on console
      const currentTimestamp = new Date().toISOString();
      console.log(currentTimestamp + '\r\n', jsonData);
      // Create an instance of WeatherData
      const weatherData = new WeatherData(
        jsonData.temperature,
        jsonData.humidity,
        jsonData.pressure,
        jsonData.weatherDesc,
        jsonData.locationID,
        jsonData.vendorID,
        jsonData.productID
      );
      // Define data point object
      const point = new Point('weather-data')
        .tag('location', 'test-site')
        .floatField('temperature', jsonData.temperature)
        .floatField('humidity', jsonData.humidity)
        .floatField('pressure', jsonData.pressure)
        .stringField('weatherDesc', jsonData.weatherDesc)
        .stringField('locationID', jsonData.locationID)
        .stringField('vendorID', jsonData.vendorID)
        .stringField('productID', jsonData.productID)
      // Write the data point to InfluxDB
      writeClient.writePoint(point);
    } catch (error) {
      console.log('Error parsing JSON data:', error);
    }
  });
};

export { handleSerialData }