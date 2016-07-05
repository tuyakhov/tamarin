var Provider = require('../provider');
module.exports = function(Message) {
    Message.observe('after save', function(ctx, next) {
        var message = ctx.instance;
        Message.app.models.sender.find({
            id: message.sender_id
        }, function (err, sender) {
            if (err) throw err;
            var provider = new Provider(sender);
            provider.send(message);
            console.log('> after save triggered:', ctx.Model.modelName, ctx.instance);
            next();
        });
    });
};
