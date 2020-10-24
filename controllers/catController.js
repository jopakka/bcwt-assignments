'use strict';
// catController
const catModel = require('../models/catModel');

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const cat_get = async (req, res) => {
  const oneCat = await catModel.getCat(req.params.id);
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