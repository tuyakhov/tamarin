var should = require('chai').should();
var mockery = require('mockery');

describe('AWS SES', function() {
    var Service = {
        sendEmail: function(params, callback) {
            callback(null, {MessageId: '123'});
        }
    };
    var SESTransport = require('../../../server/transports/ses');

    describe('transport', function() {
        it('should dispatch message', function(done) {
            var transport = new SESTransport({
                credentials: {
                    accessKeyId: "AWSACCESSKEY",
                    secretAccessKey: "AWS/Secret/key"
                },
                source: "you@samples.aws.com",
                region: 'eu-west-1'
            });
            transport.service = Service;

            transport.dispatch({
                title: "MAGA",
                body: "Make America Great Again"
            }, 'hillary.clinton@notcompromised.org').then(function (body) {
                body.should.be.an('object');
                body.should.have.property('MessageId');
                done();
            }).catch(function (err) {
                done(err)
            });
        })
    });
});