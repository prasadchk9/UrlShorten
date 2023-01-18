const express = require('express');
const path = require('path');

const router = express.Router();

const Url = require('../models/model');

//to call index.html
router.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'));
});

//to call get request handler method
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No url found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('server error');
  }
});

module.exports = router;
