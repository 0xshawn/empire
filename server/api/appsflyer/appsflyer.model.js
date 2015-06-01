'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AppsflyerSchema = new Schema({
  eventName: String,
  content: String,
  createdAt: Date
});

module.exports = mongoose.model('Appsflyer', AppsflyerSchema);
