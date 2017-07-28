var errors = require('feathers-errors');
var assert = require('assert-plus');
var merge = require('lodash.merge');
var hooks = require('feathers-hooks-common');
var getByDot = hooks.getByDot;

/**
 * @param schema - The Joi schema.
 * @param {string} property - The property on the hook's context object that will be validated.
 * Dot notation is supported to represent sub-properties (i.e. params.query).
 * @param {object} [options]
 * @param [options.joi] - The joi library that will be used for validation. This option is provided
 * in case your application requires the use of a particular version of the joi library. Defaults to
 * whatever version is attained with require('joi').
 * @param {boolean} [options.preCompile] - Whether to precompile the joi schema. Precompiling will make subsequent
 * validations faster. Defaults to true.
 * @param {Function} [options.error] - The error to throw on validation failure. Defaults to a BadRequest(400) error.
 * @returns {Function}
 */
module.exports = function (schema, property, options) {

    var defaults = {
        joi: require('joi'),
        preCompile:true,
        error:errors.BadRequest
    };
    options = merge({}, defaults, options);

    //type checking
    assert.string(property, 'property');
    assert.boolean(options.preCompile, 'options.preCompile');
    assert.function(options.error, 'options.error');

    if (options.preCompile){
        schema = options.joi.compile(schema);
    }

    return function (context) {
        var toValidate = getByDot(context, property);
        var result = options.joi.validate(schema, toValidate);
        if (result.error !== null) throw new options.error(result.error.details);
    }
};