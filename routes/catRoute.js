'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');
const multer = require('multer');
const upload = multer({dest: './uploads/'});
const {body, check} = require('express-validator');

router.get('/', catController.cat_list_get);
router.get('/:id', catController.cat_get);

router.post('/', [
    body('name').isLength({min: 1}),
    body('age').isLength({min: 1}),
    body('weight').isLength({min: 1}),
    body('owner').isLength({min: 1})
],upload.single('cat'),
    catController.cat_post);

router.put('/', catController.cat_update_put);

router.delete('/:id', catController.cat_delete);

module.exports = router;