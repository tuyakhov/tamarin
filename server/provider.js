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
            console.log(e.stack);
        }
    } else {
        transportModule = {
            dispatch: function (message, recipient) {
                console.log('Requested transport plugin "' + transport + '" could not be initiated');
            }
        }
    }
    return transportModule;
};

Provider.prototype.send = function(message, recipients) {
    var promises = [];
    for (var i in recipients) {
        promises.push(this.transport.dispatch(message, recipients[i].destination));
    }
    return Promise.all(promises);
};

module.exports = Provider;