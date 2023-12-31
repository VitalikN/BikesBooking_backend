const { HttpError, ctrlWrapper } = require('../helpers');
const { Bike } = require('../models/bike');

const getAllBikes = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const query = {};
  const availableCount = await Bike.countDocuments({ type: 'Available' });

  const busyCount = await Bike.countDocuments({ type: 'Busy' });

  const allBikes = await Bike.find(query, '-createdAt -updatedAt')
    .populate('owner', 'name email')
    .sort({ price: 1 });

  const result = allBikes.slice(skip, skip + limit);
  const totalValue = allBikes.reduce((sum, bike) => sum + bike.price, 0);

  const totalBikes = await Bike.countDocuments(query);
  const averagePrice = totalBikes > 0 ? totalValue / totalBikes : 0;

  res.json({
    total: {
      total: totalBikes,
      available: availableCount,
      busy: busyCount,
      averagePrice,
    },
    data: result,
  });
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

const updateBikeById = async (req, res) => {
  const { bikeId } = req.params;

  const bike = await Bike.findById(bikeId);
  if (!bike) {
    throw HttpError(404, 'Bike not found');
  }

  const updatedBike = await Bike.findByIdAndUpdate(
    bikeId,
    { ...req.body },
    {
      new: true,
    }
  );
  res.status(200).json(updatedBike);
};

module.exports = {
  getAllBikes: ctrlWrapper(getAllBikes),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),

  updateBikeById: ctrlWrapper(updateBikeById),
};
