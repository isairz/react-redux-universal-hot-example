import { model, Schema } from 'mongoose';

module.exports = model('Press', new Schema({
  name: String,
  cash: Number,
}));
