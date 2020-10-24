'use strict';
// userController
const userModel = require('../models/userModel');

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

const user_post = (req, res) => {
  console.log('userController:', req.body);
  res.json({ok: true});
};

const user_get = async (req, res) => {
  const oneUser = await userModel.getUser(req.params.id);
  res.json(oneUser);
};

const user_create_post = async (req, res) => {
  const result = await userModel.addUser(req.body);
  res.json(result);
};

module.exports = {
  user_list_get,
  user_get,
  user_post,
  user_create_post
};