'use strict';
// userRoute
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {body} = require('express-validator');

router.get('/', userController.user_list_get);
router.get('/:id', userController.user_get);

router.post('/', [
  body('name').trim().escape().isLength({min: 3}),
  body('email').isEmail().normalizeEmail(),
  body('passwd').
      isLength({min: 8}).
      withMessage('Password must contain at least 8 characters').
      custom(v => v.toLowerCase() !== v).
      withMessage('Password must have at least one capital letter'),
], userController.user_create_post);

module.exports = router;