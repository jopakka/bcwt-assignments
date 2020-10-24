'use strict';
// userController
const userModel = require('../models/userModel');

const users = userModel.users;

const user_list_get = (req, res) => {
  for (const i in users) {
    deleteKey(users[i], 'password');
  }
  res.json(users);
};

const user_post = (req, res) => {
  console.log(req.body);
  res.json({ok: true});
};

const user_get = (req, res) => {
  const oneUser = users.filter(user => user.id === req.params.id).
      reduce(user => user);
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