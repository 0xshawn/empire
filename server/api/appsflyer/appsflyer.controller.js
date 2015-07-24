/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /appsflyers              ->  index
 * POST    /appsflyers              ->  create
 * GET     /appsflyers/:id          ->  show
 * PUT     /appsflyers/:id          ->  update
 * DELETE  /appsflyers/:id          ->  destroy
 */

'use strict';
var _toggleAccept = -2;

var _ = require('lodash');
var Appsflyer = require('./appsflyer.model');

// Get list of appsflyers
exports.index = function (req, res) {
  Appsflyer.find(function (err, appsflyers) {
    if (err) {
      return handleError(res, err);
    }
    appsflyers.toggleAccept = false;
    return res.json(200, appsflyers);
  });
};

// Get a single appsflyer
exports.show = function (req, res) {
  Appsflyer.findById(req.params.id, function (err, appsflyer) {
    if (err) {
      return handleError(res, err);
    }
    if (!appsflyer) {
      return res.send(404);
    }
    return res.json(appsflyer);
  });
};

// Creates a new appsflyer in the DB.
exports.create = function (req, res) {
  var eventName = req.body['event_name'];
  if (!eventName) {
    return res.json(201);
  }
  var createdAt = new Date(req.body['event_time']);
  var content = JSON.stringify(req.body || '');
  var json = {
    'eventName': eventName,
    'content': content,
    createdAt: createdAt
  };

  //save if _toggleAccept > 0
  if (_toggleAccept >= 0) {
    _toggleAccept -= 1;
    Appsflyer.create(json, function (err, appsflyer) {
      if (err) {
        return handleError(res, err);
      }

      return res.json(201, appsflyer);
    });
  } else {
    return res.send(404);
  }
};

// Updates an existing appsflyer in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Appsflyer.findById(req.params.id, function (err, appsflyer) {
    if (err) {
      return handleError(res, err);
    }
    if (!appsflyer) {
      return res.send(404);
    }
    var updated = _.merge(appsflyer, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, appsflyer);
    });
  });
};

// Deletes a appsflyer from the DB.
exports.destroy = function (req, res) {
  Appsflyer.findById(req.params.id, function (err, appsflyer) {
    if (err) {
      return handleError(res, err);
    }
    if (!appsflyer) {
      return res.send(404);
    }
    appsflyer.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

exports.resetToggleAccept = function (req, res) {
  var max = req.body.toggleAccept || 50;
  _toggleAccept = max;
  console.log(_toggleAccept);
  return res.send(200);
};

exports.getToggleAccept = function (req, res) {
  var body = {
    "toggleAccept": _toggleAccept
  };
  return res.json(body);
};

exports.removeAll = function (req, res) {
  Appsflyer.remove({}, function() {});
  return res.send(200);
};

function handleError(res, err) {
  return res.send(500, err);
}
