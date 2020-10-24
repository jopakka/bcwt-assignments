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

const postCat = async (body, file) => {
  try {
    await promisePool.execute(
        'INSERT INTO wop_cat(name, age, weight, owner, filename) VALUES(?,?,?,?,?)',
        [body.name, body.age, body.weight, body.owner, file.filename],
    );
    return {success: true};
  } catch (e) {
    console.error('catModel error:', e.message);
    return {error: 'Error happen'};
  }
};

const updateCat = async (body) => {
  try {
    await promisePool.execute(
        'UPDATE wop_cat SET name = ?, age = ?, weight = ?, owner = ? WHERE cat_id = ?',
        [body.name, body.age, body.weight, body.owner, body.id],
    );
    return {success: true};
  } catch (e) {
    console.error('catModel error', e.message);
    return {error: true};
  }
};

module.exports = {
  getAllCats,
  getCat,
  postCat,
  updateCat,
};