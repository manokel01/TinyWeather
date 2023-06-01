import express from 'express';
import { Farm } from "../models/farmModel.js";
const { Response } = express;

/**
 * Find all farms
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const findAll = async (req, res) => {
    try {
        const farms = await Farm.find();
        res.status(200).json({status: true, data: farms});
    } catch (err) {
        res.status(400).json({ status: false, data: err });
    }
};

/**
 * Find one farm by farm_code.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const findOne = async (req, res) => {
    // get the farm_code from the url path
    const farm_code = req.params.farm_code;

    try {
        const farm = await Farm.findOne({farm_code: farm_code});
        res.status(200).json({status: true, data: farm});
    } catch (err) {
        res.status(400).json({status: false, data: err})
    }
}

/**
 * Create a new farm
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const create = async (req, res) => {
    // Create a new Farm object using the request body
    const newFarm = new Farm({
        farm_code: req.body.farm_code,
        location: req.body.location,
        crops: req.body.crops,
        grower: req.body.grower
    });

    try {
        // Save the new Farm object to the database
        const farm = await newFarm.save();
        // Respond with the new Farm object
        res.status(201).json(farm);
    } catch (err) {
        // If there was an error saving the new Farm object, respond with an error message
        res.status(400).json({status: false, data: err});
    }
}

/**
 * Update an existing farm
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const update = async (req, res) => {
    // Get the farm_code from the url path
    const farm_code = req.params.farm_code;

    // Create an updated Farm object using the request body
    const updatedFarm = {
        farm_code: req.body.farm_code,
        location: req.body.location,
        crops: req.body.crops,
        grower: req.body.grower
    };

    try {
        // Find the Farm object in the database by farm_code and update it with the new values
        const farm = await Farm.findOneAndUpdate({farm_code: farm_code}, updatedFarm, { new: true });
        // Respond with the updated Farm object
        res.status(200).json({status: true, data: farm});
    } catch (err) {
        // If there was an error updating the Farm object, respond with an error message
        res.status(400).json({status: false, data: err});
    }
}

/**
 * Remove a farm by farm code
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 */
export const remove = async (req, res) => {
    // Get the farm_code from the url path
    const farm_code = req.params.farm_code;

    try {
        // Find the Farm object in the database by farm_code
        const farm = await Farm.findOneAndRemove({ farm_code: farm_code });
        // Respond with the deleted Farm object
        res.status(200).json({ status: true, data: farm });
    } catch (err) {
        // If there was an error deleting the Farm object, respond with an error message
        res.status(400).json({ status: false, data: err });
    }
}
