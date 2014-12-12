(function () {
    "use strict";
    var constructorCallerCache = [];
    var newApply = module.exports = function (args) {
        var t = typeof this;
        if (t !== 'function') {
            throw new TypeError('Function.prototype.new was called on ' + Function.prototype.toString.call(this) + ', which is ' + t + ' and not a function.');
        }
        if (args === null || args === undefined) { //Apply doesn't throw exception in this cases.
            args = [];
        } else if (!(args instanceof Object)) {
            throw new TypeError('Function.prototype.apply: Arguments list has wrong type.');
        } else if (((args.length | 0) !== args.length) || args.length <= 0) {
            //Negative length is allowed in apply, but produce stack overflow, which is bad, VERY BAD!
            if (!args.length) {
                args = [];
            } else {
                throw new TypeError('Function.prototype.apply: Arguments list has wrong type.');
            }
        }
        return getConstructorCaller(args.length)(this, args);
    };
    var getConstructorCaller = function (length) {
        if (typeof constructorCallerCache[length] !== 'function') {
            var i, code = [];
            for (i = 0; i < length; ++i) {
                code.push('a[' + i + ']');
            }
            code = 'return new f(' + code.join(',') + ');';
            constructorCallerCache[length] = new Function('f', 'a', code);
        }
        return constructorCallerCache[length];
    };
    var install = newApply.install = function () {
        Object.defineProperty(Function.prototype, 'new', {
            'configurable': true,
            'writable': true,
            'value': newApply
        });
        newApply.install = installed;
    };
    var installed = function () {
        if (Function.prototype.new !== newApply) {
            install();
        }
    };
})();