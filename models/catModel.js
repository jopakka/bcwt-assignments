'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT * FROM wop_cat');
    return rows;
  } catch (e) {
    console.error('catModel error:', e.message);
    return []
  }
};

const getCat = async (id) => {
  try {
    const [oneCat] = await promisePool.execute(
        'SELECT * FROM wop_cat WHERE cat_id = ?', [id]);
    console.log(oneCat.reduce(cat => cat));
    return oneCat.reduce(cat => cat);
  } catch (e) {
    console.error('catModel error:', e.message);
    return []
  }
};

module.exports = {
  getAllCats,
  getCat,
};