'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');
const multer = require('multer');
const upload = multer({dest: './uploads'});
const {body} = require('express-validator');

router.get('/', catController.cat_list_get);
router.get('/:id', catController.cat_get);

router.post('/', upload.single('cat'), catController.cat_post);

router.put('/', [
  body('name').notEmpty().trim().escape(),
  body('age').
      isNumeric().
      custom(v => v >= 0 && v <= 50).
      withMessage('Give age between 0 and 50'),
  body('weight').
      isNumeric().
      custom(v => v >= 0 && v < 25).
      withMessage('Give weight between 0 and 25'),
  body('owner').isNumeric(),
], catController.cat_update_put);

router.delete('/:id', catController.cat_delete);

module.exports = router;