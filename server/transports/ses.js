var aws = require('aws-sdk');
var SESTransport = function (settings) {
    aws.config.(settings);
    this.source = settings.source;
    this.service = aws.SES;
};
SESTransport.prototype = {
    dispatch: function (content, recipient) {
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
                Source: this.source
            };
            this.service.sendEmail(params, function(err, data) {
                if (err) 
                    reject(err);
                else     
                    resolve(data);
            }); 
        });
    }
};
module.exports = SESTransport;