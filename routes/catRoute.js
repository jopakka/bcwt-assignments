'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');
const multer = require('multer');
const upload = multer({
  dest: './uploads',
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes('image')) {
      return cb(null, false, new Error('Must be an image'));
    }
    cb(null, true);
  },
});
const {body} = require('express-validator');

router.get('/', catController.cat_list_get);
router.get('/:id', catController.cat_get);

router.post('/', upload.single('cat'), [
  body('id').notEmpty().trim().escape().isNumeric(),
  body('name').notEmpty().trim().escape(),
  body('age', 'Give age between 0 and 50').
      isNumeric().
      custom(v => v >= 0 && v <= 50),
  body('weight', 'Give weight between 0 and 25').
      isNumeric().
      custom(v => v >= 0 && v < 25),
  body('owner').isNumeric(),
], catController.cat_post);

router.put('/', [
  body('id').notEmpty().trim().escape().isNumeric(),
  body('name').notEmpty().trim().escape(),
  body('age', 'Give age between 0 and 50').
      isNumeric().
      custom(v => v >= 0 && v <= 50),
  body('weight', 'Give weight between 0 and 25').
      isNumeric().
      custom(v => v >= 0 && v < 25),
  body('owner').isNumeric(),
], catController.cat_update_put);

router.delete('/:id', catController.cat_delete);

module.exports = router;