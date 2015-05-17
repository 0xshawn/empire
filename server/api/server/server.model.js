'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ServerSchema = new Schema({
  hostname: String,
  desciption: String
});

module.exports = mongoose.model('Server', ServerSchema);
