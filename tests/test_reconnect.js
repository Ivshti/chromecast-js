/**
 * Test for device and connection reuse.
 * Recommended to be run with DEBUG=castv2 to see underlying protocol communication.
 */

chromecastjs = require('../');

var media = {
	url : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4',
	subtitles: [{
		language: 'en-US',
		url: 'http://carlosguerrero.com/captions_styled.vtt',
		name: 'English'
	},
	{
		language: 'es-ES',
		url: 'http://carlosguerrero.com/captions_styled_es.vtt',
		name: 'Spanish'
	}
	],
	cover: {
		title: 'Big Bug Bunny',
		url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'
	},
	subtitles_style: { 
		backgroundColor: '#FFFFFFFF', // see http://dev.w3.org/csswg/css-color/#hex-notation
		foregroundColor: '#000FFFF', // see http://dev.w3.org/csswg/css-color/#hex-notation
		edgeType: 'DROP_SHADOW', // can be: "NONE", "OUTLINE", "DROP_SHADOW", "RAISED", "DEPRESSED"
		edgeColor: '#AA00FFFF', // see http://dev.w3.org/csswg/css-color/#hex-notation
		fontScale: 1.5, // transforms into "font-size: " + (fontScale*100) +"%"
		fontStyle: 'BOLD_ITALIC', // can be: "NORMAL", "BOLD", "BOLD_ITALIC", "ITALIC",
		fontFamily: 'Droid Sans',
		fontGenericFamily: 'CURSIVE', // can be: "SANS_SERIF", "MONOSPACED_SANS_SERIF", "SERIF", "MONOSPACED_SERIF", "CASUAL", "CURSIVE", "SMALL_CAPITALS",
		windowColor: '#AA00FFFF', // see http://dev.w3.org/csswg/css-color/#hex-notation
		windowRoundedCornerRadius: 10, // radius in px
		windowType: 'ROUNDED_CORNERS' // can be: "NONE", "NORMAL", "ROUNDED_CORNERS"
	}
}

var browser = new chromecastjs.Browser();

browser.on('deviceOn', function(device) {
	testCast(device, 0, media);
});

function testCast(device, startTime, media) {
	console.log('connecting on %s', device.host);
	device.play(media, startTime, function() {
		console.log('playing media (start@%s) on chromecast: %s', startTime, media.url);

		setTimeout(function() {
			device.stop(function (err, status) {
				console.log('device stopped');
				
				setTimeout(function() {
					testCast(device, startTime+30, media); //infinite loop
				}, 12000);
			});
		}, 12000);
	});
}
