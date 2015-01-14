var util = require('util');
var DefaultMediaReceiver  = require('castv2-client').DefaultMediaReceiver;

var PopcornStyledMediaReceiver = function()  {
	DefaultMediaReceiver.apply(this, arguments);
};
PopcornStyledMediaReceiver.APP_ID = '887D0748';

util.inherits(PopcornStyledMediaReceiver, DefaultMediaReceiver);

module.exports = PopcornStyledMediaReceiver;
