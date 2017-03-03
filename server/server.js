var loopback = require('loopback'),
    boot = require('loopback-boot'),
    log = require('./logger'),
    bunyanMiddleware = require('bunyan-middleware');

var app = module.exports = loopback();

app.middleware('routes:before', bunyanMiddleware({logger: log}));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    log.info('Web server listening at: %s', baseUrl);
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
