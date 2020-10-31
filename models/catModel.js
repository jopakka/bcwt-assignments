'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();
const {body, validationResult} = require('express-validator');

const getAllCats = async () => {
  try {
    const [rows] = await promisePool.query(
        'SELECT wop_cat.*, wop_user.name as owner_name FROM wop_cat LEFT JOIN wop_user ON wop_cat.owner = wop_user.user_id');
    return rows;
  } catch (e) {
    return {error: e.message};
  }
};

const getCat = async (id) => {
  try {
    const [oneCat] = await promisePool.execute(
        'SELECT wop_cat.*, wop_user.name as owner_name FROM wop_cat LEFT JOIN wop_user ON wop_cat.owner = wop_user.user_id WHERE wop_cat.cat_id = ? ',
        [id]);
    return oneCat.reduce(cat => cat);
  } catch (e) {
    return {error: e.message};
  }
};

const postCat = async (req) => {
  req.body = JSON.parse(JSON.stringify(req.body));
  await body('name').isLength({min: 1}).run(req);
  await body('age').
      isNumeric().
      custom(v => v >= 0 && v <= 50).
      withMessage('Give age between 0 and 50').
      run(req);
  await body('weight').
      isNumeric().
      custom(v => v >= 0 && v < 25).
      withMessage('Give weight between 0 and 25').
      run(req);
  await body('owner').isNumeric().custom(async v => {
    const [user] = await getUser(v);
    console.log('catmodel', user)
    return true;
  })

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return {error: errors.array()};

  try {
    const [status] = await promisePool.execute(
        'INSERT INTO wop_cat(name, age, weight, owner, filename) VALUES(?,?,?,?,?)',
        [
          req.body.name,
          req.body.age,
          req.body.weight,
          req.body.owner,
          req.file.filename],
    );
    const cat = await getCat(status['insertId'])
    return cat;
  } catch (e) {
    return {error: e.message};
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
    return {error: true};
  }
};

const deleteCat = async (id) => {
  try {
    await promisePool.execute(
        'DELETE FROM wop_cat WHERE cat_id = ?',
        [id],
    );
    return {success: true};
  } catch (e) {
    return {error: true};
  }
};

module.exports = {
  getAllCats,
  getCat,
  postCat,
  updateCat,
  deleteCat,
};