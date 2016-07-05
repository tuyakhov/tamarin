var assert = require('chai').assert;
var app = require('../../server/server');

describe('Message', function() {
    var templateId, senderId;
    describe('create', function () {
        it('should create a template', function (done) {
            var Template = app.models.Template;
            Template.create({
                title: 'Welcome {{username}}',
                body: 'Welcome {{username}}',
                name: 'dummy',
                alias: 'fake',
                created_at: 123123,
                updated_at: 123123
            }, function(err, template) {
                if (err) throw err;
                templateId = template.id;
                assert.ok(template.title);
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
                if (err) throw err;
                senderId = sender.id;
                assert.ok(sender.transport);
                assert.ok(sender.data);
                done();
            });
        });
        it('should send a message to ses', function (done) {
            var Message = app.models.Message;
            Message.create({
                created_at: 234234,
                data: {
                    title: {username: "Nick"},
                    body: {username: "Nick"}
                },
                recipients: [321,322],
                sender_id: senderId,
                template_id: templateId,
                queued_at: 345345
            }, function(err, message) {
                if (err) throw err;
                assert.ok(message.id);
                assert.ok(message.data);
                done();
            });
        });
    });
});