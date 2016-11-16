var twilio = require('twilio');

var TwilioTransport = function (settings) {
    this.source = settings.from;
    var credentials = settings.credentials || {};
    this.service = twilio(credentials.accountSid, credentials.authToken);
};
TwilioTransport.prototype = {
    dispatch: function (content, recipient) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var params = {
                to: recipient,
                from: self.source,
                body: content.body
            };
            self.service.sendMessage(params, function(err, data) {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });
        });
    }
};
module.exports = TwilioTransport;