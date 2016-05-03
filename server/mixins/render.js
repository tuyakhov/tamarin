var handlebars = require('handlebars');

module.exports = function(Model, options) {
    Model.renderTemplate = function(source, context) {
        return new Promise(function (resolve, reject) {
            Object.keys(context).forEach(function (property) {
                if (property !== 'id') {
                    var template = handlebars.compile(source[property]);
                    source[property] = template(context[property]);
                }
            });
            resolve(source);
        });
    };
};