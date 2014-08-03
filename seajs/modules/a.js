define(function(require, exports, module) {
    var a = {
        sayName: function() {
            console.log('my name is a');
        },
        sayHello: function() {
            console.log('a: hello !');
        }
    };
    module.exports = a;
});