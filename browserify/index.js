/**
 * 
 */
var a = require('./modules/run.js');
a.run();

void function() {
    require('./modules/eat.js').eat();
}();