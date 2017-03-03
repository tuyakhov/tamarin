var assert = require('chai').assert;
var mockery = require('mockery');

describe('Message', function() {
    var templateId, senderId, recipientId;
    var Provider = function (sender) {
        return {
            send: function (message, recipients) {
                return new Promise(function(resolve, reject) {
                    assert.equal(message.body, 'Welcome Nick', 'Message was rendered incorrectly');
                    assert.isArray(recipients, 'Wrong format for property');
                    resolve();
                });
            }
        }
    };
    mockery.registerMock('../provider', Provider);
    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
    });

    var app = require('../../server/server');

    describe('normal flow', function () {
        it('should create a template', function (done) {
            var Template = app.models.Template;
            Template.create({
                title: 'Welcome {{username}}',
                body: 'Welcome {{username}}',
                name: 'dummy',
                alias: 'fake'
            }, function(err, template) {
                if (err) return done(err);
                templateId = template.id;
                assert.ok(template.title);
                assert.ok(template.created_at);
                assert.ok(template.body);
                done();
            });
        });
        it('should create a sender', function (done) {
            var Sender = app.models.Sender;
            Sender.create({
                transport: 'ses',
                data: {name: 'SES'}
            }, function(err, sender) {
                if (err) return done(err);
                senderId = sender.id;
                assert.ok(sender.transport);
                assert.ok(sender.data);
                done();
            });
        });
        it('should render and send a message using provider', function (done) {
            var Message = app.models.Message;
            Message.create({
                data: {
                    title: {username: "Nick"},
                    body: {username: "Nick"}
                },
                recipients: ["nick@example.com"],
                sender_id: senderId,
                template_id: templateId,
                queued_at: 345345
            }, function(err, message) {
                if (err) return done(err);
                assert.ok(message.created_at);
                done();
            });
        });
    });

    mockery.disable();
});