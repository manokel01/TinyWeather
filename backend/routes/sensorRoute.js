import express from 'express';
import { findAll, findOne, create, update, remove } from '../controllers/sensorController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Sensor:
 *       type: object
 *       required:
 *         - uuid
 *       properties:
 *         uuid:
 *           type: string
 *           description: The sensor's unique code
 *         location:
 *           type: array
 *           items:
 *             type: number
 *           description: The sensor's location coordinates
 *         farm:
 *           oneOf:
 *             - type: string
 *               description: id of the farm associated with the sensor
 *             - $ref: '#/components/schemas/Farm'
 *               description: The ObjectId of the farm associated with the sensor
 */

 /**
  * @swagger
  * tags:
  *   name: Sensors
  *   description: The sensors' managing API
 */

/**
 * @swagger
 * /api/sensors:
 *   get:
 *     summary: Get all sensors.
 *     description: Retrive all sensor data
 *     tags: [Sensors]
 *     responses:
 *       200:
 *         description: Successfully retrieved all sensors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Sensor'
 *       400:
 *         description: Invalid request or error in retrieving sensors.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in retrieving sensors.
 */
router.get('/', findAll);

/**
 * @swagger
 * /api/sensors/{uuid}:
 *  get:
 *    summary: Get a sensor based on uuid name.
 *    tags: [Sensors]
 *    parameters:
 *      - in: path
 *        name: uuid
 *        required: true
 *        description: The UUID of the sensor to retrieve.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successfully retrieved the sensor.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Sensor'
 *      400:
 *        description: Invalid request or error in retrieving sensor.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                data:
 *                  type: string
 *                  status: Error in retrieving sensor.
 */
router.get('/:uuid', findOne)

/**
 * @swagger
 * /api/sensors/create:
 *   post:
 *     summary: Create a new sensor.
 *     description: Create a new sensor in the database.
 *     tags: [Sensors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sensor'
 *     responses:
 *       201:
 *         description: Successfully created a new sensor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 *       400:
 *         description: Invalid request or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: string
 *                   example: Error in creating a new sensor.
 */
router.post('/create', create);

/**
 * @swagger
 * /api/sensors/update/{uuid}:
 *   patch:
 *     summary: Update a sensor.
 *     description: Update a sensor in the database based on their UUID.
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: The UUID of the sensor to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sensor'
 *     responses:
 *       200:
 *         description: Successfully updated the sensor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 *       400:
 *         description: Invalid request or missing required fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in updating the sensor.
 */
router.patch('/update/:uuid', update);

/**
 * @swagger
 * /api/sensors/delete/{uuid}:
 *   delete:
 *     summary: Delete a sensor.
 *     description: Delete a sensor in the database based on their username.
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: The UUID of the grower to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the sensor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sensor'
 *       400:
 *         description: Invalid request or error in deleting the sensor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in deleting the sensor.
 */
router.delete('/delete/:uuid', remove);

export { router };