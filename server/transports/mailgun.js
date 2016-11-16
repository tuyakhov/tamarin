var mailgun = require('mailgun-js');
var MailgunTransport = function (settings) {
    this.service = mailgun(settings.credentials);
    this.source = settings.from;
};
MailgunTransport.prototype = {
    dispatch: function (content, recipient) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var data = {
                to: recipient,
                from: self.source,
                subject: content.title,
                text: content.body || ''
            };
            self.service.messages().send(data, function(err, body) {
                if (err)
                    reject(err);
                else
                    resolve(body);
            });
        });
    }
};
module.exports = MailgunTransport;