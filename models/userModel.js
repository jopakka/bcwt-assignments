'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const { validationResult } = require('express-validator')

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query(
        'SELECT user_id, name, email FROM wop_user');
    return rows;
  } catch (e) {
    return { error: e.message };
  }
};

const getUser = async (id) => {
  try {
    const [oneUser] = await promisePool.execute(
        'SELECT user_id, name, email FROM wop_user WHERE user_id = ?', [id]);
    return oneUser.reduce(user => user, {xD: 'ggez'});
  } catch (e) {
    return { error: e.message };
  }
};

const addUser = async (req) => {
  const errors = validationResult(req);
  if(!errors.isEmpty())
    return { error: errors.array() };

  try {
    const [status] = await promisePool.execute(
        'INSERT INTO wop_user(name, email, password) VALUES(?, ?, ?)',
        [req.body.name, req.body.email, req.body.passwd]);
    const user = await getUser(status['insertId'])
    return user
  } catch (e) {
    return { error: e.message };
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
};