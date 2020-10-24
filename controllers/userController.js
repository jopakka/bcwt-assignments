'use strict';
// userController
const userModel = require('../models/userModel');

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  for (const i in users) {
    deleteKey(users[i], 'password');
  }
  res.json(users);
};

const user_post = (req, res) => {
  console.log(req.body);
  res.json({ok: true});
};

const user_get = async (req, res) => {
  const oneUser = await userModel.getUser(req.params.id);
  deleteKey(oneUser, 'password');
  res.json(oneUser);
};

function deleteKey(user, key) {
  delete user[key];
  return user;
}

module.exports = {
  user_list_get,
  user_get,
  user_post,
};