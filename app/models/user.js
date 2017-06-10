const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    id: String,
    password: String,
    accessToken:String,
    refreshToken:String
}));