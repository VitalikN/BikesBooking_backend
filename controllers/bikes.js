const { HttpError, ctrlWrapper } = require('../helpers');
const { Bike } = require('../models/bikes');

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

module.exports = {
  getAllBikes: ctrlWrapper(getAllBikes),
};
