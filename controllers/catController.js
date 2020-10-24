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

const cat_post = async (req, res) => {
  const result = await catModel.postCat(req.body, req.file);
  res.json(result);
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
};