'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NICSchema = new Schema({
  name: String,
  privateIp: String,
  publicIp: String
});

var ServerSchema = new Schema({
  hostname: String,
  description: String,
  nic: [NICSchema]
});

module.exports = mongoose.model('Server', ServerSchema);
