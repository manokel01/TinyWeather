import express from 'express';
import { findAll, findOne, create, update, remove, getFarmsByGrowerUsername } from '../controllers/farmController.js';
import { protect } from '../middleware/authMiddleware.js';

// Create an instance of the Express router
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Farm:
 *       type: object
 *       required:
 *         - farm_code
 *         - grower
 *       properties:
 *         farm_code:
 *           type: string
 *           description: The farm's unique code
 *         location:
 *           type: array
 *           items:
 *             type: number
 *           description: The farm's location coordinates
 *         crops:
 *           type: array
 *           items:
 *             type: string
 *           description: The crops grown on the farm
 *         grower:
 *           oneOf:
 *             - type: string
 *               description: id of the grower associated with the farm
 *             - $ref: '#/components/schemas/Grower'
 *               description: The ObjectId of the grower associated with the farm
 */

 /**
  * @swagger
  * tags:
  *   name: Farms
  *   description: The farms' managing API
*/

/**
 * @swagger
 * /api/farms:
 *   get:
 *     summary: Get all farms.
 *     tags: [Farms]
 *     responses:
 *       200:
 *         description: Successfully retrieved all farms.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Farm'
 *       400:
 *         description: Invalid request or error in retrieving farms.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in retrieving farms.
 */

// Route to retrieve all farms
router.get('/', findAll);

/**
 * @swagger
 * /api/farms/{farm_code}:
 *   get:
 *     summary: Get a farm based on farm's code.
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: farm_code
 *         required: true
 *         description: The farm code of the farm to search for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the farm.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farm'
 *       400:
 *         description: Invalid request or error in retrieving farm.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in retrieving farm.
 */

// Route to retrieve a single farm by its code
router.get('/:farm_code', findOne);


/**
 * @swagger
 * /api/farms/create:
 *   post:
 *     summary: Create a new farm.
 *     tags: [Farms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Farm'
 *     responses:
 *       201:
 *         description: Successfully created a new farm.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farm'
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
 *                   example: Error in creating a new farm.
 */

// Route to create a new farm in the database
router.post('/create', create)

/**
 * @swagger
 * /api/farms/update/{farm_code}:
 *   patch:
 *     summary: Update a farm.
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: farm_code
 *         required: true
 *         description: The farm code of the Farm to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Farm'
 *     responses:
 *       200:
 *         description: Successfully updated the farm.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farm'
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
 *                   status: Error in updating the farm.
 */

// Route to update a farm based on the farm's code
router.patch('/update/:farm_code', update);

/**
 * @swagger
 * /api/farms/delete/{farm_code}:
 *   delete:
 *     summary: Delete a fram.
 *     tags: [Farms]
 *     parameters:
 *       - in: path
 *         name: farm_code
 *         required: true
 *         description: The farm_code of the farm to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the farm.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farm'
 *       400:
 *         description: Invalid request or error in deleting the farm.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in deleting the farm.
 */

// Route to delete a farm based on the farm's code
router.delete('/delete/:farm_code', remove);

/**
 * @swagger
 * /api/farms/grower/{username}/:
 *   get:
 *     summary: Get grower's farms.
 *     description: Get a list of a grower's farms based on their username.
 *     tags: [Farms, Growers]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the grower to search farms for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the grower's farms.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Farm'
 *       400:
 *         description: Invalid request or error in retrieving the grower's farms.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in retrieving the grower's farms.
 */
router.get('/grower/:username/', getFarmsByGrowerUsername);

export { router };
