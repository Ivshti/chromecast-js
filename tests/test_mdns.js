/**
 * Test only mDNS browser
 * Run with DEBUG=mdns:browser* to see underlying mDNS communication.
 */

chromecastjs = require('../');

var browser = new chromecastjs.Browser();

browser.on('deviceOn', function(device){
	console.log('\r\nChromecast Found: ', device);
});

setTimeout(function() {
	console.log('\r\n\r\n > All Device Responses', browser.devices);
	//process.exit();
}, 10000);
