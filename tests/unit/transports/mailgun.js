var should = require('chai').should();

describe('Mailgun', function() {
    var MailgunTransport = require('../../../server/transports/mailgun');
    var Service = {
        messages: function() {
            return {
                send: function(data, callback) {
                    callback(null, {'id': '123@mailgun.org'})
                }
            }
        }
    };
    describe('transport', function() {
        it('should dispatch message', function(done) {

            var transport = new MailgunTransport({credentials: {
                apiKey: 'APIKEY',
                domain: 'domain.com'
            },
                from: "you@samples.mailgun.org"
            });
            transport.service = Service;
            transport.dispatch({
                title: "MAGA",
                body: "Make America Great Again"
            }, 'hillary.clinton@nevercompromised.org').then(function (body) {
                body.should.be.an('object');
                body.should.have.property('id');
                done();
            }).catch(function (err) {
                done(err)
            });
        }) 
    });
});