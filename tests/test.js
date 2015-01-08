/**
 * Test for all device calls.
 * Recommended to be run with DEBUG=castv2 to see underlying protocol communication.
 */
chromecastjs = require('../');

var media = {
	url : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4',
	subtitles: [
		{
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
};

var browser = new chromecastjs.Browser();

browser.on('deviceOn', function(device) {
	testDevice(device);
});

function testDevice(device) {
	console.log('discovered chromecast: ', device.config.name);
	console.log('connecting on %s', device.host);

	// Starting to play Big Buck Bunny (made in Blender) exactly in the first minute without subtitles or cover.
	// device.play('http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4', 60, function(){
	// 	console.log('Playing in your chromecast!')
	// });
	device.play(media, 0, function() {
		console.log('playing media on chromecast: ', media.url);

		setTimeout(function() {
			device.setVolume( 0.25, function( err, newVol){
				if(err) console.error("error changing the volume");
				else console.log('volume set to: '+newVol.level);
			});
		}, 5000);
		
		setTimeout(function() {
			device.setVolumeMuted(true, function(err, newVol) {
				if(err) console.error("error muting the volume");
				else console.log('volume muted');
			});
		}, 10000);
		
		setTimeout(function() {
			device.setVolumeMuted(false, function(err, newVol) {
				if(err) console.error("error un-muting the volume");
				else console.log('volume un-muted');
			});
		}, 15000);

		setTimeout(function() {
			device.setVolume( 0.5, function( err, newVol){
				if(err) console.error("there was an error changing the volume");
				else console.log('volume set to: '+newVol.level);
			});
		}, 20000);

		setTimeout(function() {
			device.subtitlesOff(function(err,status){
				if(err) console.error("error setting subtitles off");
				else console.log("subtitles off");
			});
		}, 25000);

		setTimeout(function() {
			device.changeSubtitles(1, function(err, status){
				if(err) console.error("error restoring subtitles");
				else console.log("subtitles on to Spanish");
			});
		}, 30000);

		setTimeout(function() {
			device.pause(function(){
				console.log('paused!');
			});
		}, 35000);

		setTimeout(function() {
			device.unpause(function(){
				console.log('unpaused!');
			});
		}, 40000);

		setTimeout(function() {
			device.changeSubtitles(0, function(err, status){
				if(err) console.error("error restoring subtitles");
				else console.log("subtitles changed back to English");
			});
		}, 45000);

		setTimeout(function() {
			device.changeSubtitlesSize(10, function(err, status){
				if(err) console.error("error increasing subtitles size.");
				else console.log("subtitles size increased");
			});
		}, 46000);

		setTimeout(function() {
			device.seek(30,function(){
				console.log('seeking forward');
			});
		}, 50000);

		setTimeout(function() {
			device.changeSubtitlesSize(1, function(err, status){
				if(err) console.error("error decreasing subtitles size.");
				else console.log("subtitles size decreased");
			});
		}, 60000);

		setTimeout(function() {
			device.pause(function(){
				console.log('paused!');
			});
		}, 70000);

		setTimeout(function() {
			device.seek(30,function(){
				console.log('seeking forward');
			});
		}, 80000);

		setTimeout(function() {
			device.seek(30,function(){
				console.log('seeking forward');
			});
		}, 85000);

		setTimeout(function() {
			device.unpause(function(){
				console.log('unpaused!');
			});
		}, 90000);

		setTimeout(function() {
			device.seek(-30,function(){
				console.log('seeking backwards');
			});
		}, 100000);

		setTimeout(function() {
			device.seekTo(0,function(){
				console.log('seeking back to start');
			});
		}, 110000);
		
		setTimeout(function() {
			device.seekTo(300,function(){
				console.log('seeking to exactly 5 mins');
			});
		}, 120000);

		setTimeout(function() {
			device.getStatus(function(status) {
				device.seekTo( status.media.duration - 60 ,function(){
					console.log('seeking to 60 sec before end');
				});
			});
		}, 130000);
		
		setTimeout(function() {
			device.stop(function(){
				console.log('stopped!');
			});
		}, 150000);
	});
}
