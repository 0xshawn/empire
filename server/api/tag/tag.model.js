'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
  name: String,
  description: String,
  servers: Array
});

module.exports = mongoose.model('Tag', TagSchema);
