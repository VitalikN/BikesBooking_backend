const express = require('express');

const { schemas } = require('../../models/bike');
const ctrl = require('../../controllers/bikes');
const { validateBody, authenticate, isValidId } = require('../../middlewares');

const router = express.Router();

router.get('/', ctrl.getAllBikes);

router.post(
  '/',
  authenticate,

  validateBody(schemas.addSchema),
  ctrl.add
);
router.delete('/:bikeId', authenticate, isValidId, ctrl.deleteById);

router.patch(
  '/:bikeId',
  authenticate,
  isValidId,
  validateBody(schemas.updateSchema),
  ctrl.updateBikeById
);

module.exports = router;
