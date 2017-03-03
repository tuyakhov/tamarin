var log = require('../logger');

var MailgunTransport = function (settings) {
    this.service = require('mailgun-js')(settings.credentials);
    this.source = settings.from;
};
MailgunTransport.prototype = {
    dispatch: function (content, recipient) {
        var self = this;
        log.info('Dispatch mailgun message to %s', recipient);
        return new Promise(function (resolve, reject) {
            var data = {
                to: recipient,
                from: self.source,
                subject: content.title,
                html: content.body || ''
            };
            self.service.messages().send(data, function(err, body) {
                resolve(body);
                if (err)
                    reject(err);
                else
                    resolve(body);
            });
        });
    }
};
module.exports = MailgunTransport;