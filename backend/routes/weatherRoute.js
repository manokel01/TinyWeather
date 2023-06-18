import express from 'express';
import { getLatestWeather, getPastDayWeather, getAllWeatherData }  from '../controllers/weatherController.js';

// Create a new router instance
const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Weather:
 *       type: object
 *       required:
 *       properties:
 *         temperature:
 *           type: number
 *           description: The current temperature.
 *         humidity:
 *           type: number
 *           description: The current humidity.
 *         pressure:
 *           type: number
 *           description: The current pressure.
 *         sensorId:
 *           type: string
 *           description: The ObjectId of the device that generated the weather data.
 *           oneOf:
 *             - type: object
 *             - $ref: '#/components/schemas/Weather'
 *         location:
 *           type: array
 *           items:
 *             type: number
 *           description: The coordinates of the weather data.
 *         battery:
 *           type: number
 *           description: The battery level.
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp of the weather data.
 */

 /**
  * @swagger
  * tags:
  *   name: Weather
  *   description: The weather data managing API
  */

/**
 * @swagger
 * /api/weather/{sensorId}/latest:
 *   get:
 *     summary: Returns the lastest weather data for a specific sensor.
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: sensorId
 *         required: true
 *         description: ID of the sensor to retrieve weather data for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved latest weather for the specified sensor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Weather'
 *       400:
 *         description: Invalid request or error in retrieving weather data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in retrieving latest weather data.
 */

router.get('/:sensorId/latest', getLatestWeather);

/**
 * @swagger
 * /api/weather/{sensorId}/past/day:
 *   get:
 *     summary: Returns the weather data of the last 24h.
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: sensorId
 *         required: true
 *         description: ID of the sensor to retrieve weather data for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved last 24h weather.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Weather'
 *       400:
 *         description: Invalid request or error in retrieving last 24h weather data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in retrieving latest 24h weather data.
 */
router.get('/:sensorId/past/day', getPastDayWeather);

/**
 * @swagger
 * /api/weather/{sensorId}/all:
 *   get:
 *     summary: Returns all past weather data
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: sensorId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the weather sensor
 *     responses:
 *       200:
 *         description: Successfully retrieved all weather data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Weather'
 *       400:
 *         description: Invalid request or error in retrieving weather data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in retrieving weather data.
 */
router.get('/:sensorId/all', getAllWeatherData);

// Export the router instance
export { router };
