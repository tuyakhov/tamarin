var aws = require('aws-sdk');
var SESTransport = function (settings) {
    this.source = settings.source;
    settings.credentials = new aws.Credentials(settings.credentials);
    this.service = settings.service || new aws.SES(settings);
};
SESTransport.prototype = {
    dispatch: function (content, recipient) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var params = {
                Destination: {
                    ToAddresses: [
                        recipient
                    ]
                },
                Message: {
                    Body: {
                        Html: {
                            Data: content.body,
                            Charset: 'UTF-8'
                        }
                    },
                    Subject: {
                        Data: content.title,
                        Charset: 'UTF-8'
                    }
                },
                Source: self.source
            };
            self.service.sendEmail(params, function(err, data) {
                if (err) 
                    reject(err);
                else     
                    resolve(data);
            }); 
        });
    }
};
module.exports = SESTransport;