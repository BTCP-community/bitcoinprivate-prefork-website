/* Test command for console
	Snapshot: timeNow = timeSnapshot
	Confetti: showConfetti()
*/

var canShowCountdown = true;
var setArcs = false;
var doConfettiResize = true;

var RADIUS = 54;
var CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Set the date and time after which the snapshot will occur (next discovered block)
var timeSnapshot = 1519837200; // 28th Feb 2018 @ 17:00:00 UTC


// Get current timestamp and set as timeNow via response header of a tiny file at endpoint
var timeNow;
fetch('/favicons/manifest.json?rand='+Math.floor((Math.random()*10000000)+1)).then(function(response) {
	var headerDate = response.headers.get('Date')
	Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
	timeNow = new Date(headerDate).getUnixTime();

	// Every 1 sec, count down the timer, establish unit values
	// and if we've passed the snapshot date & time, switch to that message display
	if (canShowCountdown && timeSnapshot > timeNow) {
		$("#countdownRoot").css('display',' block');

		tickoverCountdown = setInterval(function() {
			countdownTime();
			establishCountdownValues();

			if (timeSnapshot < timeNow) {
				showAwaitingBlock();
				clearInterval(tickoverCountdown);
			}
		},1000);
	} else {
		$("#splashRoot").css('display','block');
	}
});


// Increment timer
var countdownTime = function() {
	timeNow++;
}


// Establish new unit values
var establishCountdownValues = function() {
	var timeRemaining = timeSnapshot-timeNow;
	daysRemaining = parseInt(timeRemaining/60/60/24,10);
	hoursRemaining = parseInt((timeRemaining-(daysRemaining*60*60*24))/60/60,10);
	minsRemaining = parseInt((timeRemaining-(daysRemaining*60*60*24)-(hoursRemaining*60*60))/60,10);
	secsRemaining = parseInt(timeRemaining-(daysRemaining*60*60*24)-(hoursRemaining*60*60)-(minsRemaining*60),10);

	setUnitPosition('Days', 7, daysRemaining);
	setUnitPosition('Hours', 24, hoursRemaining);
	setUnitPosition('Mins',60, minsRemaining);
	setUnitPosition('Secs',60, secsRemaining);

	// If we haven't set arcs around units yet, set animation delay offsets
	if (!setArcs) {
		// Fade in counter container now
		fadeInCountdownContainer();
		// Set flag so we don't get here again
		setArcs = true;
	}
}


// Fade in the counter container
var fadeInCountdownContainer = function() {
	$('#countdownContainer').css('opacity', 1);
}


var foundBlocks = {
	zcl: false,
	btc: false,
}

// Show the awaiting next block message
var showAwaitingBlock = function() {
	$('#countdownContainer').css('display','none');
	$('#awaitingContainer').css('display','block');
	$('#blockDetails').css('display','block');
	$('#confetti').css('display','none');
	$('#snapshotContainer').css('display','none');

	// First Try fetching blocks
	fetchBlocks();

	// Then poll for blocks every 5 secs
	var getBlocksPolling = setInterval(function() {
		// Fetch and update blocks
		fetchBlocks();
		updateBlocks(foundBlocks.zcl, foundBlocks.btc);
		// If we have block heights on both ZCL and BTC, show confetti
		if (foundBlocks.zcl !== false && foundBlocks.btc !== false) {
			clearInterval(getBlocksPolling);
			showConfetti();
		}
	},5000);
}


// Fetch new data from blocks
var fetchBlocks = function() {
	// Get block height data from JSON file
	fetch('/javascript/blocks.json?rand='+Math.floor((Math.random()*10000000)+1))
	// Return the data
	.then(function(response) {
		return response.json();
	// Process the data
	}).then(function(jsonData) {
		foundBlocks = jsonData;
		// Set ZCL block height or placeholder text
		$('#awaitingContainerZclassic').html(
			foundBlocks.zcl !== false
				? foundBlocks.zcl
				: "Awaiting..."
		);
		// Set BTC block height or placeholder text
		$('#awaitingContainerBitcoin').html(
			foundBlocks.btc !== false
				? foundBlocks.btc
				: "Awaiting..."
		);
	// Output error message to console
	}).catch(function(err) {
		console.log("getBlocksPolling - failed!", err);
	})
}

// Update ZCL & BTC block
var updateBlocks = function(zcl, btc) {
	if (zcl !== false) {
		$('#awaitingContainerZclassic').html(zcl);
	}
	if (btc !== false) {
		$('#awaitingContainerBitcoin').html(btc);
	}
}


// Show confetti and snapshot message
var showConfetti = function() {
	$('#countdownContainer').css('display','none');
	$('#awaitingContainer').css('display','none');
	$('#confetti').css('display','block');
	$('#snapshotContainer').css('display','block');
	$('#blockDetails').css('display','block');
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = '/javascript/Confetti.js';
	document.getElementsByTagName('head')[0].appendChild(script);
}


// Countdown initial style
var setUnitPosition = function(unit, size, remaining) {
	// Set values in DOM elems
	$('.counter__'+unit.toLowerCase() + '_progress').attr("stroke-dasharray", CIRCUMFERENCE);
	$('#countdown'+unit).text(remaining);
	$('#countdown'+unit).attr("data-size", size);
	var current = CIRCUMFERENCE - ((CIRCUMFERENCE / size) * remaining)
	$('.counter__'+unit.toLowerCase() + '_progress').attr("stroke-dashoffset", current);
}
