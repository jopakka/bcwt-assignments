'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');
const multer = require('multer');
const upload = multer({
  dest: './uploads',
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/jpg' &&
        file.mimetype !== 'image/jpeg' &&
        file.mimetype !== 'image/gif' &&
        file.mimetype !== 'image/png') {
      return cb('File must be JPG, JPEG, GIF or PNG', false);
    }
    cb(null, true);
  },
});

router.get('/', catController.cat_list_get);
router.get('/:id', catController.cat_get);

router.post('/', upload.single('cat'), catController.cat_post);

router.put('/', catController.cat_update_put);

router.delete('/:id', catController.cat_delete);

module.exports = router;