import express from 'express';
import { getLatestWeather, getPastDayWeather }  from '../controllers/weatherController.js';

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
 *             - $ref: '#/components/schemas/Device'
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
 * /api/weather/latest:
 *   get:
 *     summary: Returns the lastest weather data.
 *     tags: [Weather]
 *     responses:
 *       200:
 *         description: Successfully retrieved latest weather.
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
router.get('/latest', getLatestWeather);

/**
 * @swagger
 * /api/weather/past/day:
 *   get:
 *     summary: Returns the weather data of the last 24h.
 *     tags: [Weather]
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
router.get('/past/day', getPastDayWeather);

// Export the router instance
export { router };
