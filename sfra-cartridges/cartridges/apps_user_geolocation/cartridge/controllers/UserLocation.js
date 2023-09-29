'use strict';

/**
 * @namespace UserLocation
 */

var server = require('server');

server.get('GetLocationInfo', function (req, res, next) {
    res.json(req.geolocation)
    return next()
})

module.exports = server.exports()