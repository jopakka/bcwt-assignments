'use strict';
// catController
const catModel = require('../models/catModel');

const cats = catModel.cats;

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const cat_get = (req, res) => {
  const oneCat = cats.filter(cat => cat.id === req.params.id).
      reduce(cat => cat);
  res.json(oneCat);
};

const cat_post = (req, res) => {
  console.log(req.file);
  res.json(req.file);
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
};