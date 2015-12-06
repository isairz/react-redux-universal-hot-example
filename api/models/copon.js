import { model, Schema } from 'mongoose';

module.exports = model('Copon', new Schema({
  code: { type: Number, unique: true },
  username: String,
}));
