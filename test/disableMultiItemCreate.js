var disableMultiItemCreate = require('../lib/disableMultiItemCreate');
var constants = require('./constants');
var methods = constants.context.methods;
var types = constants.context.types;
var utils = require('./utils');
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var errors = require('feathers-errors');
var _ = require('lodash');


describe('disableMultiItemCreate', function () {

    it('throws when creating multiple resources', function (done) {
        var ctx = new utils.BaseContext(methods.create, types.before);
        ctx.data = [
            {foo: 3},
            {foo: 5}
        ];
        function willThrow() {
            disableMultiItemCreate()(ctx);
        }

        expect(willThrow).to.throw(errors.BadRequest);
        done();
    });

    it('noops when creating a single resource', function (done) {
        var oldCtx = new utils.BaseContext(methods.create, types.before);
        oldCtx.data = {foo: 3};
        var newCtx = _.cloneDeep(oldCtx);
        disableMultiItemCreate()(newCtx);
        assert.deepEqual(oldCtx, newCtx);
        done();
    });
});