import express from 'express';
import { Grower } from "../models/growerModel.js";
const { Response } = express;

/**
 * Find all growers
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const findAll = async (req, res) => {
    try {
        const results = await Grower.find();
        res.status(200).json({status: true, data: results});
    } catch (err) {
        res.status(400).json({ status: false, data: err });
    }
};

/**
 * Find one grower by username
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const findOne = async (req, res) => {
    // get the username from the url path
    const username = req.params.username;

    try {
        const result = await Grower.findOne({username: username});
        res.status(200).json({status: true, data: result});
    } catch (err) {
        res.status(400).json({status: false, data: err})
    }
}

/**
 * Create a new grower
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const create = async (req, res) => {
    // create a new grower
    const newGrower = new Grower({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.password
    });

    try {
        const result = await newGrower.save();
        res.status(201).json({status: true, data: result});
    } catch (err) {
        res.status(400).json({status: false, data: err});
    }
}

/**
 * Update an existing grower
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const update = async (req, res) => {
    const username = req.params.username;
    // assign the new grower values
    const updatedGrower = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.password
    };

    try {
        const result = await Grower.findOneAndUpdate({username: username}, updatedGrower, { new: true });
        res.status(200).json({status: true, data: result});
    } catch (err) {
        res.status(400).json({status: false, data: err});
    }
}

/**
 * Remove a grower by username
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const remove = async (req, res) => {
    const username = req.params.username;

    try {
        const result = await Grower.findOneAndRemove({ username: username });
        res.status(200).json({ status: true, data: result });
    } catch (err) {
        res.status(400).json({ status: false, data: err });
    }
}
