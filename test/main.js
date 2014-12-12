(function() {
    "use strict";
    exports.setUp = function(callback) {
        require('..').install();
        callback();
    };
    exports['test installation'] = function(test) {
        var applyNew = require('..'), ctor = function() {};
        test.strictEqual(ctor.new, applyNew, 'Library applyNew is not installing properly.');
        test.done();
    };
    exports['test without arguments'] = function(test) {
        var ctor = function() {
            test.strictEqual(arguments.length, 0, 'Invalid number of arguments received.');
        };
        ctor.new();
        test.done();
    };
    exports['test with one argument'] = function(test) {
        var args = [Math.random()];
        var ctor = function() {
            test.strictEqual(arguments.length, 1, 'Invalid number of arguments received.');
            test.strictEqual(arguments[0], args[0], 'Invalid value for arguments[0] received.');
        };
        ctor.new(args);
        test.done();
    };
    exports['test with two arguments'] = function(test) {
        var args = [Math.random(), Math.random()];
        var ctor = function() {
            test.strictEqual(arguments.length, 2, 'Invalid number of arguments received.');
            test.strictEqual(arguments[0], args[0], 'Invalid value for arguments[0] received.');
            test.strictEqual(arguments[1], args[1], 'Invalid value for arguments[1] received.');
        };
        ctor.new(args);
        test.done();
    };
    exports['test with two arguments'] = function(test) {
        var args = [Math.random(), Math.random()];
        var ctor = function() {
            test.strictEqual(arguments.length, 2, 'Invalid number of arguments received.');
            test.strictEqual(arguments[0], args[0], 'Invalid value for arguments[0] received.');
            test.strictEqual(arguments[1], args[1], 'Invalid value for arguments[1] received.');
        };
        ctor.new(args);
        test.done();
    };
    exports['test with three arguments'] = function(test) {
        var args = [Math.random(), Math.random(), Math.random()];
        var ctor = function() {
            test.strictEqual(arguments.length, 3, 'Invalid number of arguments received.');
            test.strictEqual(arguments[0], args[0], 'Invalid value for arguments[0] received.');
            test.strictEqual(arguments[1], args[1], 'Invalid value for arguments[1] received.');
            test.strictEqual(arguments[2], args[2], 'Invalid value for arguments[2] received.');
        };
        ctor.new(args);
        test.done();
    };
    exports['test exception when called in non-function context'] = function(test) {
        var o = {}, n;
        n = o.new = Function.prototype.new;
        test.throws(function() {
            o.new();
        }, TypeError, 'Exception should be thrown when called on non-function.');
        test.throws(function() {
            n.call(2);
        }, TypeError, 'Exception should be thrown when called on non-function.');
        test.done();
    };
    exports['test exception when called with invalid arguments object'] = function(test) {
        var ctor = function() {};
        test.throws(function() {
            ctor.new(2);
        }, TypeError, 'Exception should be thrown when called with non-object arguments.');
        test.throws(function() {
            ctor.new({
                'length': 'asd'
            });
        }, TypeError, 'Exception should be thrown when arguments object is not array-like object.');
        test.throws(function() {
            ctor.new({
                'length': -2
            })
        }, TypeError, 'Exception should be thrown when arguments object is not array-like object.');
        test.done();
    };
})();