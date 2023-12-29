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
      type: Number,
      required: true,
    },
    price: {
      type: Number,
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
  id: Joi.string().required(),
  name: Joi.string().required(),
  type: Joi.string()
    .valid(...typeList)
    .required(),
  color: Joi.string().required(),

  size: Joi.number().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  type: Joi.string().valid(...typeList),
  color: Joi.string(),

  size: Joi.number(),
  price: Joi.number(),
  description: Joi.string(),
  favorite: Joi.boolean(),
});

const schemas = {
  addSchema,
  updateSchema,
};

bikeSchema.post('save', HandleErrorMongoose);

const Bike = model('bike', bikeSchema);

module.exports = { Bike, schemas };
