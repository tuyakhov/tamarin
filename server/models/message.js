var Provider = require('../provider');
module.exports = function(Message) {
    Message.validatesPresenceOf('data', 'recipients', 'sender_id', 'template_id');

    Message.observe('after save', function(ctx, next) {
        var message = ctx.instance;
        Message.app.models.Sender.findById(message.sender_id, {}, function (err, sender) {
            if (err) throw err;
            var provider = new Provider(sender);
            Message.app.models.Recipient.find({
                where: {
                    id: {
                        inq: message.recipients
                    }
                }
            }, function (err, recipients) {
                Message.app.models.Template.findById(message.template_id, {}, function(err, template) {
                    Message.renderTemplate(template, message.data).then(function(view) {
                        provider.send(view, recipients).then(function(data) {
                            next(null, data);
                        }).catch(function (err) {
                            next(err);
                        });
                    })
                });
            });
        });
    });
};
