// import express from 'express';
// import * as datasetController from '../controllers/datasetController.js';

// // Create a new router instance
// const router = express.Router()

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Weather:
//  *       type: object
//  *       required:
//  *       properties:
//  *         temperature:
//  *           type: number
//  *           description: The current temperature.
//  *         humidity:
//  *           type: number
//  *           description: The current humidity.
//  *         pressure:
//  *           type: number
//  *           description: The current pressure.
//  *         sensorId:
//  *           type: string
//  *           description: The ObjectId of the device that generated the sensor dataset.
//  *           oneOf:
//  *             - type: object
//  *             - $ref: '#/components/schemas/Device'
//  *         location:
//  *           type: array
//  *           items:
//  *             type: number
//  *           description: The coordinates of the sensor dataset.
//  *         battery:
//  *           type: number
//  *           description: The battery level.
//  *         timestamp:
//  *           type: string
//  *           format: date-time
//  *           description: The timestamp of the sensor dataset.
//  */

//  /**
//   * @swagger
//   * tags:
//   *   name: Weather
//   *   description: The sensor dataset managing API
//   */

// /**
//  * @swagger
//  * /api/dataset/latest:
//  *   get:
//  *     summary: Returns the lastest sensor dataset.
//  *     tags: [Weather]
//  *     responses:
//  *       200:
//  *         description: Successfully retrieved latest dataset.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               items:
//  *                 $ref: '#/components/schemas/Weather'
//  *       400:
//  *         description: Invalid request or error in retrieving sensor dataset.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: boolean
//  *                 data:
//  *                   type: string
//  *                   status: Error in retrieving latest sensor dataset.
//  */
// router.get('/latest', datasetController.getLatestWeather);

// /**
//  * @swagger
//  * /api/dataset/past/day:
//  *   get:
//  *     summary: Returns the sensor dataset of the last 24h.
//  *     tags: [Weather]
//  *     responses:
//  *       200:
//  *         description: Successfully retrieved last 24h dataset.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               items:
//  *                 $ref: '#/components/schemas/Weather'
//  *       400:
//  *         description: Invalid request or error in retrieving last 24h sensor dataset.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: boolean
//  *                 data:
//  *                   type: string
//  *                   status: Error in retrieving latest 24h sensor dataset.
//  */
// router.get('/past/day', datasetController.getPastDayWeather);

// // Export the router instance
// export { router };
