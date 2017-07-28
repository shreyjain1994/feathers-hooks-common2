var hooks = require('feathers-hooks-common');
var checkContext = hooks.checkContext;
var errors = require('feathers-errors');
var format = require('util').format;

module.exports = function () {
    return function (context) {
        checkContext(context, 'before', ['create'], 'disableMultiItemCreate');

        if (Array.isArray(context.data)) {
            throw new errors.BadRequest(
                format("Multi-record creates are not allowed for %s. (disableMultiItemCreate)",
                    context.path
                )
            )
        }
    }
};