var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String,
    nicname: String,
    cash: Number,
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
