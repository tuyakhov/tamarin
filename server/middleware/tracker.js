var log = require('../logger');

module.exports = function() {
    return function tracker(req, res, next) {
        log.info('Request on %s', req.url);
        log.info(req.body);
        var start = process.hrtime();
        res.once('finish', function() {
            var diff = process.hrtime(start);
            var ms = diff[0] * 1e3 + diff[1] * 1e-6;
            log.info(res.body);
            log.info('The request processing time is %d ms.', ms);
        });
        next();
    };
};