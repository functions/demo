define(function(require, exports, module) {
    var b = {
        sayName: function() {
            console.log('my name is b');
        },
        sayHello: function() {
            console.log('b: hello !');
        }
    };
    module.exports = b;
});