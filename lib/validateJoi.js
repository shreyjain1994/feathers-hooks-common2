var errors = require('feathers-errors');
var assert = require('assert-plus');
var merge = require('lodash.merge');
var hooks = require('feathers-hooks-common');
var getByDot = hooks.getByDot;

/**
 * Checks to see if joi is a valid joi library.
 * @param {object} joi
 * @returns {boolean}
 */
function isValidJoi(joi){
    var isJoi = true;
    if (typeof joi !== 'object') isJoi = false;
    if (typeof joi.compile !== 'function') isJoi = false;
    if (typeof joi.validate !== 'function') isJoi = false;
    return isJoi;
}

/**
 * @param schema - The Joi schema.
 * @param {string} property - The property on the hook's context object that will be validated.
 * Dot notation is supported to represent sub-properties (i.e. params.query).
 * @param {object} [options]
 * @param {object} [options.joi] - The joi library that will be used for validation. This option is provided
 * in case your application requires the use of a particular version of the joi library. Defaults to
 * whatever version is attained with require('joi').
 * @param {boolean} [options.preCompile] - Whether to precompile the joi schema. Precompiling will make subsequent
 * validations faster. Defaults to true.
 * @param {Function} [options.error] - The error to throw on validation failure. Defaults to a BadRequest(400) error.
 * @returns {Function}
 */
module.exports = function (schema, property, options) {

    var defaults = {
        preCompile:true,
        error:errors.BadRequest
    };
    options = merge({}, defaults, options);

    //fallback to using installed joi library
    if (typeof options.joi === 'undefined'){
        try{
            options.joi = require('joi');
        }
        catch(e){
            throw new Error('No joi library is installed or was provided in options.joi. This must be done in order to use this feathers hook.')
        }
    }

    //type checking
    assert.string(property, 'property');
    assert.bool(options.preCompile, 'options.preCompile');
    assert.func(options.error, 'options.error');
    assert(isValidJoi(options.joi), 'Invalid joi library is installed or was provided in options.joi.');

    if (options.preCompile){
        try{
            schema = options.joi.compile(schema);
        }
        catch(e){
            throw new TypeError('schema is invalid');
        }
    }

    return function (context) {
        var toValidate = getByDot(context, property);
        var result = options.joi.validate(toValidate, schema);
        if (result.error !== null) throw new options.error(result.error.details);
    }
};