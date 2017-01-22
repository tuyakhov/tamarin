var assert = require('chai').assert;

describe('Render mixin', function() {
    it('should render a template', function (done) {
        var mockModel = {};
        require('../../server/mixins/render')(mockModel, {});
        mockModel.renderTemplate({
            title: '{{name}}', body: '<div>{{html}}</div>'
        }, {title: {name: 'Nick'}, body: {'html': 'tag'}}).then(function(res) {
            assert.equal(res.title, 'Nick');
            assert.equal(res.body, '<div>tag</div>');
            done();
        }).catch(function(err) {
            done(err);
        })
    });
});