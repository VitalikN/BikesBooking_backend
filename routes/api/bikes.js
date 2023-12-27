const express = require('express');

const { schemas } = require('../../models/bikes');
const ctrl = require('../../controllers/bikes');
const router = express.Router();

router.get('/', ctrl.getAllBikes);

module.exports = router;
