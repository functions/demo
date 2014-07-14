/**
 * 
 */
'use strict';
var a = require('./modules/run.js');
a.run();

(function() {
    require('./modules/eat.js').eat();
})();