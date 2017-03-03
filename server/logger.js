var bunyan = require('bunyan');
module.exports = bunyan.createLogger({
    name: "tamarin",
    level: (process.env.NODE_ENV === 'test') ? 'error' : 'info'
});