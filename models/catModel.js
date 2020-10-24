'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    const [rows] = await promisePool.query(
        'SELECT wop_cat.*, wop_user.name as owner_name FROM wop_cat LEFT JOIN wop_user ON wop_cat.owner = wop_user.user_id');
    return rows;
  } catch (e) {
    console.error('catModel error:', e.message);
    return [];
  }
};

const getCat = async (id) => {
  try {
    const [oneCat] = await promisePool.execute(
        'SELECT wop_cat.*, wop_user.name as owner_name FROM wop_cat LEFT JOIN wop_user ON wop_cat.owner = wop_user.user_id WHERE wop_cat.cat_id = ? ',
        [id]);
    return oneCat.reduce(cat => cat);
  } catch (e) {
    console.error('catModel error:', e.message);
    return {error: `Error happen`};
  }
};

module.exports = {
  getAllCats,
  getCat,
};