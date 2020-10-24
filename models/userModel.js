'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query(
        'SELECT user_id, name, email FROM wop_user');
    return rows;
  } catch (e) {
    console.error('userModel error:', e.message);
    return [];
  }
};

const getUser = async (id) => {
  try {
    const [oneUser] = await promisePool.execute(
        'SELECT user_id, name, email FROM wop_user WHERE user_id = ?', [id]);
    return oneUser.reduce(user => user);
  } catch (e) {
    return {error: `Error happen`};
  }
};

const addUser = async (body) => {
  try {
    await promisePool.execute(
        'INSERT INTO wop_user(name, email, password) VALUES(?, ?, ?)',
        [body.name, body.email, body.passwd]);
    return {success: true}
  } catch (e) {
    console.error('userModel error:', e.message);
    return {error: `Error happen`};
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
};