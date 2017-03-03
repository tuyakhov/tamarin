var log = require('./logger');

var Provider = function (sender) {
    var settings = sender.data || {};
    settings.credentials = sender.credentials || {};
    this.transport = this.createTransport(sender.transport, settings);
};

Provider.prototype.createTransport = function (transport, settings) {
    var transportModule;
    if (typeof transport === 'object' && typeof transport.dispatch === 'function') {
        transportModule = transport;
    } else if (typeof transport === 'string') {
        try {
            transportModule = new (require('./transports/' + transport))(settings);
        } catch (e) {
            log.error(e.stack);
        }
    } else {
        transportModule = {
            dispatch: function (message, recipient) {
                log.error('Requested transport plugin "' + transport + '" could not be initiated');
            }
        }
    }
    return transportModule;
};

Provider.prototype.send = function(message, recipients) {
    var promises = [],
        i;
    for (i = 0; i < recipients.length; ++i) {
        promises.push(this.transport.dispatch(message, recipients[i]));
    }
    return Promise.all(promises);
};

module.exports = Provider;