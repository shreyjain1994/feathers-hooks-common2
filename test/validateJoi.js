var validate = require('../lib/validateJoi');
var chai = require('chai');
var expect = chai.expect;
var format = require('util').format;
var joi = require('joi');

var schema = {};


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
            validate(schema, 'foobar', {joi:joi});
            done();
        });

        it('works when given no options', function(done){
            validate(schema, 'foobar');
            done();
        });
    })
});