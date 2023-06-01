import { queryApi } from '../config/influxdb.js';
import { Weather } from "../models/weatherModel.js";

const weather = new Weather();

/**
 * GET - /api/weather/latest:
 * @description Get latest weather data
 * @returns {Promise} a promise that resolves with the latest weather data
 */
export const getLatestWeather = (req, res) => {
    // create a promise to return the data before website is rendered
    return new Promise((resolve, reject) => {
        const fluxQuery = `from(bucket: "TinyWeather") ` +
        `|> range(start: 0) |> last() ` +
        `|> filter(fn: (r) => r._measurement == "weather-data")`;

        queryApi.queryRows(fluxQuery, {
            next: (row, tableMeta) => {
                const result = tableMeta.toObject(row);
                mapWeatherData(result);
            },
            error: (error) => {
                console.error(error);
                res.status(400).json({ status: false, error: 'Failed to fetch weather data' });
            },
            complete: () => {
                resolve(weather);
                res.status(200).json({ status: true, data: weather });
            },
        });
    });
};

/**
 * GET - /api/weather/past/day:
 * @description Get weather data of the past day
 * @returns {Promise} a promise that resolves with the weather data of the past day
 */
export const getPastDayWeather = (req, res) => {
    // create a promise to return the data before website is rendered
    return new Promise((resolve, reject) => {
        // const fluxQuery = 'from(bucket: "TinyWeather") |> range(start: -1d) |> last() |> filter(fn: (r) => r._measurement == "weather-data")';

        // get average temperature for last hour
        const fluxQuery = `from(bucket: "TinyWeather") ` +
        `|> range(start: -1d) ` +
        `|> filter(fn: (r) => r._measurement == "weather-data") ` +
        `|> filter(fn: (r) => r._field == "temperature" or r._field == "humidity" or r._field == "pressure") ` +
        `|> group(columns: ["_field"]) ` +
        `|> mean()`;

        queryApi.queryRows(fluxQuery, {
            next: (row, tableMeta) => {
                const result = tableMeta.toObject(row);
                mapWeatherData(result);
            },
            error: (error) => {
                console.error(error);
                res.status(400).json({ status: false, error: 'Failed to fetch weather data' });
            },
            complete: () => {
                resolve(weather);
                res.status(200).json({ status: true, data: weather });
            },
        });
    });
};

/**
 * Map the result of a query to a weather object
 * @param {Object} result - the result of a query
 */
function mapWeatherData(result) {
    for (const key in result) {
        switch (result._field) {
            case 'temperature':
                weather.temperature = result._value;
                break;
            case 'humidity':
                weather.humidity = result._value;
                break;
            case 'pressure':
                weather.pressure = result._value;
                break;
            case 'weatherDesc':
                weather.weatherDesc = result._value;
                break;
            case 'deviceId':
                weather.deviceId = result._value;
                break;
            case 'location':
                weather.location[0] = result._value[0];
                weather.location[1] = result._value[1];
                break;
            case 'battery':
                weather.battery = result._value;
                break;
            case 'timestamp':
                weather.timestamp = result._value;
                break;
            default:
                break;
        }
    }
}
