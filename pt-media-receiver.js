var util = require('util');
var DefaultMediaReceiver  = require('castv2-client').DefaultMediaReceiver;

var PopcornStyledMediaReceiver = function()  {
	DefaultMediaReceiver.apply(this, arguments);
};
PopcornStyledMediaReceiver.APP_ID = '9A435985';

util.inherits(PopcornStyledMediaReceiver, DefaultMediaReceiver);

module.exports = PopcornStyledMediaReceiver;
