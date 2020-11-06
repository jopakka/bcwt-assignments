'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query(
        'SELECT user_id, name, email FROM wop_user');
    return rows;
  } catch (e) {
    return {error: e.message};
  }
};

const getUser = async (id) => {
  try {
    const [oneUser] = await promisePool.execute(
        'SELECT user_id, name, email FROM wop_user WHERE user_id = ?', [id]);
    return oneUser[0] || {error: `No users with id: ${id}`};
  } catch (e) {
    return {error: e.message};
  }
};

const addUser = async (req) => {
  try {
    const [status] = await promisePool.execute(
        'INSERT INTO wop_user(name, email, password) VALUES(?, ?, ?)',
        [req.body.name, req.body.email, req.body.passwd]);
    return await getUser(status['insertId']);
  } catch (e) {
    return {error: e.message};
  }
};

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE email = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  getUserLogin,
};