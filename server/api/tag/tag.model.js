'use strict';
require('../server/server.model.js');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
  name: String,
  description: String,
  servers: [{type: Schema.ObjectId, ref: 'Server'}]
});

module.exports = mongoose.model('Tag', TagSchema);
