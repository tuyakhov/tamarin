module.exports = function(Template) {
    Template.render = function(id, data, callback) {
        Template.findById(id, {}).then(function (instance) {
            Template.renderTemplate(instance, data).then(function (result) {
                callback(null, result);
            });
        });
    };

    Template.remoteMethod(
        'render',
        {
            accepts: [
                {arg: 'id', type: 'string', required: true},
                {arg: 'data', type: 'context', http: {source: 'body'}}
            ],
            http: {path: '/:id/render', verb: 'post', status: 200},
            returns: {type: "Template", root: true},
            description: "Renders the template with context data"
        }
    );
};
