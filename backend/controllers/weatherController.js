import { queryApi } from '../config/influxdb.js';
import { Weather } from "../models/weatherModel.js";

const weather = new Weather();

/**
 * GET - /api/weather/:sensorId/latest:
 * @description Get latest weather data from a specific sensor
 * @param {string} req - the sensor id
 * @returns {Promise} a promise that resolves with the latest weather data
 */
export const getLatestWeather = (req, res) => {
  const sensorId = req.params.sensorId;
    // create a promise to return the data before website is rendered
    return new Promise((resolve, reject) => {
        const fluxQuery = `from(bucket: "TinyWeather") ` +
        `|> range(start: 0) |> last() ` +
        `|> filter(fn: (r) => r._measurement == "${sensorId}")`;

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
 * GET - /api/weather/:sensorId/past/day:
 * @description Get average weather data of the past day
 * @returns {Promise} a promise that resolves with the average weather data of the past day
 */
export const getPastDayWeather = (req, res) => {
    const sensorId = req.params.sensorId;

    // create a promise to return the data before website is rendered
    return new Promise((resolve, reject) => {
        // get average temperature for last hour
        const fluxQuery = `from(bucket: "TinyWeather") ` +
        `|> range(start: -1d) ` +
        `|> filter(fn: (r) => r._measurement == "${sensorId}") ` +
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
 * GET - /api/weather/:sensorId/all:
 * @description Get weather data of last month (dummy controller to simulate past weather data)
 * @param {Object} req - the HTTP request object
 * @param {Object} res - the HTTP response object
 * @returns {void}
 */
export const getAllWeatherData = (req, res) => {
  const { sensorId } = req.params;

  const fluxQuery = `from(bucket: "TinyWeather")
                      |> range(start: -3w, stop: -1h)
                      |> filter(fn: (r) => r._measurement == "${sensorId}")
                      |> filter(fn: (r) => r._field == "temperature" or r._field == "humidity" or r._field == "pressure")
                      |> window(every: 1m)`;

  const temperatureData = [];
  const humidityData = [];
  const pressureData = [];

  queryApi.queryRows(fluxQuery, {
    next: (row, tableMeta) => {
      const result = tableMeta.toObject(row);
      mapWeatherData(result);

      if (weather !== null) {
        switch (result._field) {
          case 'temperature':
            temperatureData.push(weather);
            break;
          case 'humidity':
            humidityData.push(weather);
            break;
          case 'pressure':
            pressureData.push(weather);
            break;
          default:
            break;
        }
      }
    },
    error: (error) => {
      console.error(error);
      res.status(400).json({ status: false, error: 'Failed to fetch weather data for date and time range' });
    },
    complete: () => {
      res.status(200).json({ status: true, data: { temperature: temperatureData, humidity: humidityData, pressure: pressureData } }); // Return the object with separate arrays for temperature, humidity, and pressure data
    },
  });
};

        
/**
 * Map the result of a query to a weather object
 * @param {Object} result - the result of a query
 */
const mapWeatherData = (result) => {
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
      case 'sensorId':
        weather.sensorId = result._value;
        break;
      case 'location_x':
        if (!weather.location) {
          // Initialize the location property as an empty array
          weather.location = [];
        }
        weather.location[0] = result._value;
        break;
      case 'location_y':
        if (!weather.location) {
          // Initialize the location property as an empty array
          weather.location = [];
        }
        weather.location[1] = result._value;
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
};


/**
 * Map the result of the getWeatherByDate query to a weather object
 * @param {Object} result - the result of a query
 */
const mapWeatherData2 = (result) => {
    const time = result._time;
    const value = result._value;
  
    switch (result._field) {
      case 'temperature':
        return { time, temperature: value };
      case 'humidity':
        return { time, humidity: value };
      case 'pressure':
        return { time, pressure: value };
      default:
        return null;
    }
  };
