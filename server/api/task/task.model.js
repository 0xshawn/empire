'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
  target: {type: String, default: ""},
  description: {type: String, default: ""},
  launchDate: Date,
  file: {type: String, default: ""},
  finished: {type: Boolean, default: false},
  frequency: {type: String, default: ""},
  result: {type: String, default: ""},
  tags: [new Schema({
    text: String
  }, {_id: false})]
});

module.exports = mongoose.model('Task', TaskSchema);
