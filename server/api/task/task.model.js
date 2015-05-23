'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
  target: String,
  description: String,
  launchDate: Date,
  file: String,
  finished: {type: Boolean, default: false},
  result: {type: String, default: ""},
  tags: [new Schema({
    text: String
  }, {_id: false})]
});

module.exports = mongoose.model('Task', TaskSchema);
