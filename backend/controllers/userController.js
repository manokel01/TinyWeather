import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const result = await user.save();
    res.status(201).json({ status: true, data: {
      _id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: generateJWT(user._id)
    } });
  } catch (err) {
    res.status(400).json({ status: false, data: err });
  }
};

/**
 * Update an existing user by username
 * @param {Request} req 
 * @param {Response} res 
 */
export const update = async (req, res) => {
  const username = req.params.username;

  // Hash password if provided
  let hashedPassword;
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(req.body.password, salt);
  }

  const user = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  };

  try {
    const result = await User.findOneAndUpdate({ username }, user , { new: true });
    res.status(200).json({ status: true, data: {
      _id: result._id,
      username: result.username,
      firstname: result.firstname,
      lastname: result.lastname,
      email: result.email,
      token: generateJWT(result._id)
    }
  });
  } catch (err) {
    res.status(400).json({ status: false, data: err });
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

/**
 * Authenticate a user
 * @param {Request} req 
 * @param {Response} res 
 */
export const login = async (req, res) => {
  // read entered username and password
  const { username, password } = req.body;

  // Find user with entered password
  const user = await User.findOne({ username });

  // Check if username and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ status: true, data: {
      _id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: generateJWT(user._id)
    } });
  } else {
    res.status(400).json({ status: false, message: 'Invalid username or password' });
  }
};

/**
 * Get current logged-in user to send token to.
 * @param {Request} req 
 * @param {Response} res 
 */
export const getMe = async (req, res) => {
  const { _id, username, firstname, lastname, email } = await User.findById(req.user._id); // id is obtained from middleware

  res.status(200).json({
   id: _id,
   username: username,
   firstname: firstname,
   lastname: lastname
  })

};

// Generate JWT
export const generateJWT = (id) => {
  return jwt.sign(
    {id}, process.env.JWT_SECRET, {
      expiresIn: '30d', // expires in 30 days
    }
  )
}