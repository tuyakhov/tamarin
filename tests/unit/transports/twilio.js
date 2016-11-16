var should = require('chai').should();

describe('Twilio', function() {
    var TwilioTransport = require('../../../server/transports/twilio');
    var Service = {
        sendMessage: function(data, callback) {
            callback(null, {'sid': 'MMc781610ec0b3400c9e0cab8e757da937'})
        }
    };
    describe('transport', function() {
        it('should dispatch message', function(done) {

            var transport = new TwilioTransport({credentials: {
                accountSid: 'AccountSID',
                authToken: 'AuthTOKEN'
            },
                from: "+14506667788"
            });
            transport.service = Service;

            transport.dispatch({
                body: "Make America Great Again"
            }, '+16515556677').then(function (body) {
                body.should.be.an('object');
                body.should.have.property('sid');
                done();
            }).catch(function (err) {
                done(err)
            });
        })
    });
});