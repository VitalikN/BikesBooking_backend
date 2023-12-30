const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { HandleErrorMongoose } = require('../helpers');

const typeList = ['Available', 'Busy', 'Unavailable'];

const bikeSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: typeList,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  id: Joi.string().min(5).required(),
  name: Joi.string().min(5).required(),
  type: Joi.string()
    .valid(...typeList)
    .required(),
  color: Joi.string().required(),

  size: Joi.string().required(),
  price: Joi.string().required(),
  description: Joi.string().min(5).required(),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
  id: Joi.string().min(5),
  name: Joi.string().min(5),
  type: Joi.string().valid(...typeList),
  color: Joi.string(),

  size: Joi.string(),
  price: Joi.string(),
  description: Joi.string().min(5),
  favorite: Joi.boolean(),
});

const schemas = {
  addSchema,
  updateSchema,
};

bikeSchema.post('save', HandleErrorMongoose);

const Bike = model('bike', bikeSchema);

module.exports = { Bike, schemas };
