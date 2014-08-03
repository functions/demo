define(function(require, exports, module) {
    var a = require('./modules/a.js')
      , b = require('./modules/b.js');

    a.sayName();
    a.sayHello();
    b.sayName();
    b.sayHello();
});