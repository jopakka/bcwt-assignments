'use strict';
// catController
const catModel = require('../models/catModel');
const resize = require('../utils/resize')

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const cat_get = async (req, res) => {
  const oneCat = await catModel.getCat(req.params.id);
  res.json(oneCat);
};

const cat_post = async (req, res) => {
  await resize.makeThumbnail(req.file.path, req.file.filename)
  const result = await catModel.postCat(req);
  if (result['error'])
    res.status(400).json(result);
  else
    res.json(result);
};

const cat_update_put = async (req, res) => {
  const result = await catModel.updateCat(req);
  res.json(result);
};

const cat_delete = async (req, res) => {
  const result = await catModel.deleteCat(req.params.id);
  res.json(result);
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
  cat_update_put,
  cat_delete,
};