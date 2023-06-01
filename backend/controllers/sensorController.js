import express from 'express';
import { Sensor } from '../models/sensorModel.js';
const { Response } = express;
/**
 * Find all sensors
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const findAll = async (req, res) => {
  console.log('Find all sensors query.');
  try {
    const results = await Sensor.find();
    res.status(200).json({ status: true, data: results });
    console.log('Find all sensors query successfully executed.');
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    console.log('Find all sensors query was unsuccessful.');
  }
};

/**
 * Find one sensor by UUID
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const findOne = async (req, res) => {
  // get the UUID from the url path
  const uuid = req.params.uuid;

  try {
    const result = await Sensor.findOne({ uuid: uuid });
    res.status(200).json({ status: true, data: result });
  } catch (err) {
    res.status(400).json({ status: false, data: err });
  }
};

/**
 * Create a new sensor
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const create = async (req, res) => {
  const newSensor = new Sensor({
    uuid: req.body.uuid,
    type: req.body.type,
    farm: req.body.farm,
    status: req.body.status,
  });

  try {
    const result = await newSensor.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ status: false, data: err });
  }
};

/**
 * Update an existing sensor
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const update = async (req, res) => {
  const uuid = req.params.uuid;
  // assign the new sensor values
  const updatedSensor = {
    type: req.body.type,
    farm: req.body.farm,
    status: req.body.status,
  };

  try {
    const result = await Sensor.findOneAndUpdate({ uuid: uuid }, updatedSensor, { new: true });
    res.status(200).json({ status: true, data: result });
  } catch (err) {
    res.status(400).json({ status: false, data: err });
  }
};

/**
 * Remove a sensor by UUID
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const remove = async (req, res) => {
  const uuid = req.params.uuid;

  try {
    const result = await Sensor.findOneAndRemove({ uuid: uuid });
    res.status(200).json({ status: true, data: result });
  } catch (err) {
    res.status(400).json({ status: false, data: err });
  }
};