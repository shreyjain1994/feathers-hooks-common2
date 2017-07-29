var validate = require('../lib/validateJoi');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var format = require('util').format;
var Joi = require('joi');
var utils = require("./utils");
var constants = require('./constants');
var methods = constants.context.methods;
var types = constants.context.types;
var _ = require('lodash');
var errors = require('feathers-errors');
var schema = {foo:Joi.string().required()};


describe('validateJoi', function () {
    describe('contructor', function () {
        it('throws when given invalid parameter schema if precompiling is on', function (done) {
            function willThrow() {
                validate(undefined, 'foobar');
            }

            expect(willThrow).to.throw(TypeError, 'schema is invalid');
            done();
        });

        it('works when given proper parameter schema if precompiling is on', function (done) {
            validate(schema, 'foobar');
            done();
        });

        var invalidPropertyTypes = [3, true, {}, function () {
        }];
        invalidPropertyTypes.forEach(function (type) {
            it(format('throws when given parameter property of type %s', typeof type), function (done) {
                function willThrow() {
                    validate(schema, type);
                }

                expect(willThrow).to.throw();
                done();
            })
        });

        it('works when given parameter property of type string', function (done) {
            validate(schema, 'foobar');
            done();
        });

        var invalidPrecompileTypes = ['foo', 3, {}, function () {
        }];
        invalidPrecompileTypes.forEach(function (type) {
            it(format('throws when given parameter options.preCompile of type %s', typeof type), function (done) {
                function willThrow() {
                    validate(schema, 'foobar', {preCompile: type});
                }

                expect(willThrow).to.throw();
                done();
            })
        });

        it('works when given parameter options.preCompile of type boolean', function (done) {
            validate(schema, 'foobar', {preCompile: true});
            done();
        });

        var invalidErrorTypes = ['foo', 3, true, {}];
        invalidErrorTypes.forEach(function (type) {
            it(format('throws when given parameter options.error of type %s', typeof type), function (done) {
                function willThrow() {
                    validate(schema, 'foobar', {error: type});
                }

                expect(willThrow).to.throw();
                done();
            })
        });

        it('works when given parameter options.error of type function', function (done) {
            validate(schema, 'foobar', {
                error: function foobar() {
                }
            });
            done();
        });

        it('throws when given invalid parameter options.joi', function (done) {
            function willThrow() {
                validate(schema, 'foobar', {joi: ''});
            }

            expect(willThrow).to.throw();
            done();
        });

        it('works when given valid parameter options.joi', function(done){
            validate(schema, 'foobar', {joi:Joi});
            done();
        });

        it('works when given no options', function(done){
            validate(schema, 'foobar');
            done();
        });
    });

    it('throws when validation fails', function(done){
        var oldCtx = new utils.BaseContext(methods.create, types.before);
        oldCtx.data = {};
        var newCtx = _.cloneDeep(oldCtx);

        //outside willThrow since creating the hook should not raise any errors
        var hook = validate(schema, 'data');

        function willThrow(){
            hook(newCtx);
        }
        expect(willThrow).to.throw(errors.BadRequest);

        //context should not be modified by hook
        assert.deepEqual(newCtx, oldCtx);

        done();
    });

    it('noops when validation passes', function(done){
        var oldCtx = new utils.BaseContext(methods.create, types.before);
        oldCtx.data = {foo:'bar'};
        var newCtx = _.cloneDeep(oldCtx);
        validate(schema, 'data')(newCtx);

        //context should not be modified by hook
        assert.deepEqual(newCtx, oldCtx);

        done();
    });
});