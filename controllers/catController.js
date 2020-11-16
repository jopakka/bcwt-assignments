'use strict';
// catController
const catModel = require('../models/catModel');
const resize = require('../utils/resize');
const imageMeta = require('../utils/imageMeta');

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const cat_get = async (req, res) => {
  const oneCat = await catModel.getCat(req.params.id);
  res.json(oneCat);
};

const make_thumbnail = async (req) => {
  try {
    const ready = await resize.makeThumbnail({width: 160, height: 160},
        req.file.path,
        `./thumbnails/${req.file.filename}`);
    if (ready) {
      console.log('make_thumbnail', 'ready');
    }
  } catch (e) {
    console.error('make_thumbnail', e.message);
  }
};

const cat_post = async (req, res) => {
  const coords = await imageMeta.getCoordinates(req.file.path).catch(e => console.error('cat_post', e.message));
  console.log('coords', coords);
  if(coords === undefined) {
    return res.status(400).json({error: 'Jpeg image with coordinate data needed'});
  }
  const result = await catModel.postCat(req, coords);
  if (result['error'])
    res.status(400).json(result);
  else {
    await make_thumbnail(req);
    res.json(result);
  }
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