var Provider = require('../provider');
var log = require('../logger');

module.exports = function(Message) {
    Message.validatesPresenceOf('data', 'recipients', 'sender_id', 'template_id');

    Message.observe('after save', function(ctx, next) {
        next(null, {});
        var message = ctx.instance;
        log.info('Get message sender with id %s', message.sender_id);
        Message.app.models.Sender.findById(message.sender_id, {}, function (err, sender) {
            if (err) {log.error(err); return;}
            var provider = new Provider(sender);
            log.info('Get message template with id %s', message.template_id);
            Message.app.models.Template.findById(message.template_id, {}, function(err, template) {
                if (err) {log.error(err); return;}
                log.info('Render template with data');
                Message.renderTemplate(template, message.data).then(function(view) {
                    log.info('Sending message...');
                    provider.send(view, message.recipients).then(function(data) {
                        log.info({data: data}, 'Message with id %s has been dispatched', message.id);
                    }).catch(function (err) {
                        log.error(err, 'An error occurs during message sending %s', message.id);
                    });
                }).catch(function(err) {
                    log.error(err);
                })
            });
        });
    });
};
