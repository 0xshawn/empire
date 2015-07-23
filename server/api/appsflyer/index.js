'use strict';

var express = require('express');
var controller = require('./appsflyer.controller');

var router = express.Router();

router.get('/read', controller.getToggleAccept);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/reset', controller.resetToggleAccept);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
