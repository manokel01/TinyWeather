import express from 'express';
import { findAll, findOne, create, update, remove } from '../controllers/growerController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         street:
 *           type: string
 *         postcode:
 *           type: string
 *         country:
 *           type: string
 *
 *     Grower:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         firstname:
 *           type: string
 *           description: The grower's firstname.
 *         lastname:
 *           type: string
 *           description: The grower's lastname.
 *         username:
 *           type: string
 *           description: The grower's username.
 *         email:
 *           type: string
 *           description: The grower's email.
 *         phone:
 *           type: number
 *           description: The grower's phone number.
 *         address:
 *           $ref: '#/components/schemas/Address'
 *           description: The grower's address
 *         password:
 *           type: string
 *           description: The grower's password.
 */

 /**
  * @swagger
  * tags:
  *   name: Growers
  *   description: The growers' managing API
*/

/**
 * @swagger
 * /api/growers:
 *   get:
 *     summary: Get all growers.
 *     description: Get all growers from the database.
 *     tags: [Growers]
 *     responses:
 *       200:
 *         description: Successfully retrieved all growers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grower'
 *       400:
 *         description: Invalid request or error in retrieving growers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in retrieving growers.
 */
router.get('/', findAll);

/**
 * @swagger
 * /api/growers/{username}:
 *   get:
 *     summary: Get a grower.
 *     description: Get a grower based on their username from the database.
 *     tags: [Growers]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the grower to search for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully found the grower.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grower'
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
 *                   status: Error in finding the grower.
 */
router.get('/:username', findOne);

/**
 * @swagger
 * /api/growers/create:
 *   post:
 *     summary: Create a new grower.
 *     description: Create a new grower in the database.
 *     tags: [Growers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grower'
 *     responses:
 *       201:
 *         description: Successfully created a new grower.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grower'
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
 *                   example: Error in creating a new grower.
 */
router.post('/create', create);

/**
 * @swagger
 * /api/growers/update/{username}:
 *   patch:
 *     summary: Update a grower.
 *     description: Update a grower in the database based on their username.
 *     tags: [Growers]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the grower to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grower'
 *     responses:
 *       200:
 *         description: Successfully updated the grower.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grower'
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
 *                   status: Error in updating the grower.
 */
router.patch('/update/:username', update);

/**
 * @swagger
 * /api/growers/delete/{username}:
 *   delete:
 *     summary: Delete a grower.
 *     description: Delete a grower in the database based on their username.
 *     tags: [Growers]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the grower to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the grower.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grower'
 *       400:
 *         description: Invalid request or error in deleting the grower.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in deleting the grower.
 */
router.delete('/delete/:username', remove);

export { router };
