const { HttpError, ctrlWrapper } = require('../helpers');
const { Bike } = require('../models/bike');

const getAllBikes = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const query = {};

  const total = await Bike.countDocuments(query);
  const result = await Bike.find(query, '-createdAt -updatedAt', {
    skip,
    limit,
  })
    .populate('owner', 'name email')
    .sort({ price: 1 });

  res.json({ total, data: result });
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Bike.create({
    ...req.body,

    owner,
  });

  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { bikeId } = req.params;
  const result = await Bike.findOneAndDelete({ _id: bikeId });
  if (!result) {
    throw HttpError(404, 'Bike not found');
  }

  res.json({
    message: 'Delete success',
  });
};

module.exports = {
  getAllBikes: ctrlWrapper(getAllBikes),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
};
