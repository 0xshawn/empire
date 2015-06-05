'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UploadSchema = new Schema({

});

module.exports = mongoose.model('Upload', UploadSchema);
