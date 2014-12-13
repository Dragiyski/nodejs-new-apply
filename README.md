nodejs-new-apply
================

A micro library for calling function as constructor, but in similar to apply() style.

Installation
------------

The library install with ```npm``` and by default has no dependencies and build process.

```
npm install new-apply
```

Testing
-------

For testing, it is required [https://www.npmjs.com/package/nodeunit](nodeunit) to be installed. Two options are
available there:

1. Install ```new-apply``` with development dependencies:

```
npm install new-apply --dev
```

2. Or install ```nodeunit``` globally:

```
npm install -g nodeunit
```

Then you can call:

```
npm test
```

to test the package.

Usage
-----

This package support two types of using - as local variable or installed globally. When installed globally, all
functions receive non-enumerable property ```new``` which combines perfectly with ```apply``` and ```call``` property.

```
var newApply = require('new-apply');
```

```
require('new-apply').install();
//Now the function is places in Function.prototype.new
```

Calling ```install``` multiple times is safe. Generally ```install``` will check if ```Function.prototype.new``` is
coming from this library and redefine it, if it doesn't.

The ```new``` method accept one parameter which can be any array-like object - instances of Array, arguments, etc.
Requirements for this array-like object is to have non-negative integer length property. No restriction of number of
arguments is imposed.

### Example

Lets create a class that supports following interface:
* The last argument should be callback to be called when some work is done.
* It accept optional first argument: name;
* Called as a function, it should work the same as called as constructor.

The first two ensure that we can have more than one possible valid set of arguments. We cannot both handle different
arguments dynamically (with ```apply``` method) and use ```new``` operator to call the function as constructor.

Here is the solution library provides:

```javascript
var MyClass = function () {
    if(!(this instanceof MyClass)) {
        return MyClass.new(arguments);
    }
    if(arguments.length >= 2) {
        this._name = arguments[0];
    }
    this._callback = arguments[arguments.length - 1];
};
//Now MyClass() is equivalent to new MyClass(), independently of the number of arguments.
```

Lets make another example of dynamic arguments. Example modifying ```MyClass``` callback becoming a promise. The
```create``` method should:

* Return a promise which handle the asynchronous operation in class constructor (or some of its method).
* Can call the class with or without the optional argument name.

```javascript
MyClass.create = function (name) {
    return new Promise(function(resolve, reject) {
        var args = [function(err, value) {
            if(err) {
                reject(err);
            } else {
                resolve(value);
            }
        }];
        if(name) {
            args.unshift(name);
        }
        MyClass.new(args);
    });
}
```

One could easily tell that both cases could be done with simple if and two ```new``` operators, but if the number of
interfaces constructor accept the code become longer and most of the time repeated. ```apply``` could keep the code
compact when calling functions with several interfaces, so that what this library do, but for classes, not for
functions.

### Compability with ```apply```

The ```new``` method is almost compatible with ```apply``` with some exceptions.

* No ```thisArg``` argument, since obviously calling function with operator ```new``` creates new object for ```this```
keyword.
* Tested in node v0.10.30, if ```apply``` method receives object as argument, which have value of length property
negative, an exception raised is due to stack overflow. I do not want to simulate stack overflow, neither think it is
the proper way to act.

All other cases should be compatible with ```apply```, including the messages of the exception thrown.

Note: By default exception messages are hardcoded as function call is made to ```Function.prototype.new```. When used
locally the function is not located there.

Future
------

ES6 standard introduced the [http://wiki.ecmascript.org/doku.php?id=harmony:spread](spread operator).This operator
gives more flexibility than ```apply``` and current library. If your environment supports ES6 spread operator, use it
instead of this library.

License
-------

Lesser GPL v3.