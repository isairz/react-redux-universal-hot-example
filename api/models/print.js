import { model, Schema } from 'mongoose';

module.exports = model('Print', new Schema({
  username: String,
  nickname: String,
  memo: String,
  press: String,
  path: String,
  originalName: String,
  pages: Number,
  state: String,
  date: Date,
}));
