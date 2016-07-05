var Provider = function (sender) {
    var settings = sender.data || {};
    var transport = sender.transport || 'ses';
    var loader = require;
    try {
        module = loader('./transports/' + transport);
    } catch (e) {
        //ignore
    }console.log(module);
    if (module) {
        this.transport = new module(settings);
    }

};
Provider.prototype.send = function(message) {
    var view = message.renderTemplate(message.template, message.data);
    var promises = [];
    for (var i in message.recipients) {
        promises.push(this.transport.dispatch(view, message.recipients[i]));
    }
    Promise.all(promises).then(function (result) {
        console.log(result);
    }).catch(function (err) {
        callback(err);
    })
};
module.exports = Provider;