import { InfluxDB, Point } from '@influxdata/influxdb-client';
import dotenv from 'dotenv';
import { Weather } from '../models/weatherModel.js';

dotenv.config();

const token = "IaRU742giMEszueQ5I2HRipcxsYLRjJqF_5cI8AK_lWnmnT913lH34Olmg3tb0XCQ-wWWgX2VgBhTJQMltK3zQ=="
const url = process.env.INFLUXDB_URL;
const org = process.env.INFLUXDB_ORG;
const bucket = process.env.INFLUXDB_BUCKET;

// Initialize a new InfluxDB client instance
const influxClient = new InfluxDB({ url, token });

// Initialize a write API instance for the given organization and bucket
const writeApi = influxClient.getWriteApi(org, bucket, 'ns');

// Initialize a query API instance for the given organization
const queryApi = influxClient.getQueryApi(org);

// A method to create influxdb point from Weather class
/**
 * Initialize a new Weather instance.
 * @constructor
 * @param {Object} [weatherData] - Optional initial weather data.
 * @param {number} [weatherData.temperature] - The temperature in degrees Celsius.
 * @param {number} [weatherData.humidity] - The relative humidity as a percentage.
 * @param {number} [weatherData.pressure] - The atmospheric pressure in millibars.
 * @param {string} [weatherData.weatherDesc] - A description of the current weather conditions.
 * @param {string} [weatherData.sensorId] - TheUUID  identifier of the sensor that collected the data.
 * @param {number} [weatherData.location[0]] - The x-coordinate where the data was collected.
 * @param {number} [weatherData.location[1]] - The y-coordinate where the data was collected.
 * @param {number} [weatherData.battery] - The battery level as a percentage.
 * @param {string} [weatherData.timestamp] - The timestamp of the data as a Unix timestamp in milliseconds.
 */
const weather = new Weather();

/**
 * Create an InfluxDB point from a Weather instance.
 * @param {Weather} weather - The Weather instance to create a point from.
 * @returns {Point} The created InfluxDB point.
 */
const weatherPoint = (weather) => {
    const point = new Point('weather-data')
    .tag('crop', 'grapes')
    .tag('farm_code', 'SAM2')
    .floatField('temperature', weather.temperature)
    .floatField('humidity', weather.humidity)
    .floatField('pressure', weather.pressure)
    .stringField('weatherDesc', weather.weatherDesc)
    .stringField('sensorId', weather.sensorId)
    .floatField('location_x', weather.location[0])
    .floatField('location_y', weather.location[1])
    .floatField('battery', weather.battery)
    .stringField('timestamp', weather.timestamp);

    return point;
}

// Export the query API, write API, and weather point functions for use in other modules
export { queryApi, writeApi, weatherPoint };
