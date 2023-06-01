import express from 'express';
import { Router } from 'express';
import { findAll, findOne, create, update, remove } from '../controllers/userController.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username.
 *         firstname:
 *           type: string
 *           description: The user's firstname.
 *         lastname:
 *           type: string
 *           description: The user's lastname.
 *         email:
 *           type: string
 *           description: The user's email.
 *         password:
 *           type: string
 *           description: The user's password.
 */

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: The database users' managing API
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all database users.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successfully retrieved all database users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request or error in retrieving database users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in retrieving users.
 */
router.get('/', findAll);

/**
 * @swagger
 * /api/users/{username}:
 *   get:
 *     summary: Get a user by username.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request or error in retrieving user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in retrieving user.
 */
router.get('/:username', findOne);

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create a new user.
 *     tags: [Users]
 *     requestBody:
 *       description: User object to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request or error in creating user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in creating user.
 */
router.post('/create', create);

/**
 * @swagger
 * /api/users/update/{username}:
 *   patch:
 *     summary: Update a user.
 *     tags: [Users]
  *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the database user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User object to be updated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request or error in updating user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in updating user.
 */
router.patch('/update/:username', update);

/**
 * @swagger
 * /api/users/delete/{username}:
 *   delete:
 *     summary: Delete a user.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the user to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request or error in deleting user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: string
 *                   status: Error in deleting user.
 */
router.delete('/delete/:username', remove);

export { router };