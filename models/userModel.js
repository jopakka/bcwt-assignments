'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT * FROM wop_user');
    return rows;
  } catch (e) {
    console.error('userModel error:', e.message);
    return [];
  }
};

const getUser = async (id) => {
  try {
    const [oneUser] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE user_id = ?', [id]);
    return oneUser.reduce(cat => cat);
  } catch (e) {
    return {error: `No users with id: ${id}`};
  }
};

module.exports = {
  getAllUsers,
  getUser,
};