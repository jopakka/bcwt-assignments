'use strict';
const sharp = require('sharp');

const makeThumbnail = async (file, thumbname) => {
  // file = full path to image (req.file.path), thumbname = filename (req.file.filename)
  // TODO: use sharp to create a png thumbnail of 160x160px, use async await
  try {
    const image = await sharp(file).resize(160, 160).toFile(thumbname, (err, info) => {
      console.log('resize info', info)
      console.error('resize err', err)
    });
    console.log('resize image', image)
  } catch (e) {
    console.error('resize', e.message);
  }
};

module.exports = {
  makeThumbnail,
};