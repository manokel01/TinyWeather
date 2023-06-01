import { User } from "../models/userModel.js";

/**
 * Find all users
 * @param {Request} req 
 * @param {Response} res 
 */
export const findAll = async (req, res) => {
  const results = await User.find();

  try {
    res.status(200).json({ status: true, data: results });
    // console.log("Success in reading all users");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    // console.log("Error in reading all users");
  }
};

/**
 * Find one user by username
 * @param {Request} req 
 * @param {Response} res 
 */
export const findOne = async (req, res) => {
  const username = req.params.username;

  const result = await User.findOne({ username });

  try {
    res.status(200).json({ status: true, data: result });
    // console.log("Success in reading user");
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    // console.log("Error in reading user");
  }
};

/**
 * Create a new user
 * @param {Request} req 
 * @param {Response} res 
 */
export const create = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const result = await newUser.save();
    res.status(200).json({ status: true, data: result });
    // console.log(`${req.body.username} was created.`);
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    // console.log(`Error in creating ${req.body.username}`);
  }
};

/**
 * Update an existing user by username
 * @param {Request} req 
 * @param {Response} res 
 */
export const update = async (req, res) => {
  const username = req.body.username;

  const updatedUser = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  };

  try {
    const result = await User.findOneAndUpdate({ username }, updatedUser, { new: true });
    res.status(200).json({ status: true, data: result });
    // console.log(`${username} was updated.`);
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    // console.log(`Error in updating ${username}`);
  }
};

/**
 * Remove an existing user by username
 * @param {Request} req 
 * @param {Response} res 
 */
export const remove = async (req, res) => {
  const username = req.params.username;

  try {
    const result = await User.findOneAndRemove({ username });
    res.status(200).json({ status: true, data: result });
    // console.log(`${username} was deleted.`);
  } catch (err) {
    res.status(400).json({ status: false, data: err });
    // console.log(`Error in deleting ${username}`);
  }
};
