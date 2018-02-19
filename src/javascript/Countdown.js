var setArcs = false;
var doConfettiResize = true;

// Set the date and time after which the snapshot will occur (next discovered block)
var timeSnapshot = 1519837200; // 28th Feb 2018 @ 17:00:00 UTC

// Get current timestamp and set as timeNow
$.get("/local-data.json?q=getInfo&timestamp="+Date.now(), function(data) {
  timeNow = data.timestamp;
  // Every 1 sec, count down the timer, establish unit values
  // and if we've passed the snapshot date & time, switch to that message display
  if (timeSnapshot > timeNow) {
    document.getElementById("countdownDisplay").style.display = "block";
    tickoverCountdown = setInterval(function() {
      countdownTime();
      establishUnitValues();
      if (timeSnapshot < timeNow) {
        showAwaitingBlock();
        clearInterval(tickoverCountdown);
      }
    },1000);
  } else {
    document.getElementById("regularDisplay").style.display = "block";
  }
});

// Increment timer
var countdownTime = function() {
  timeNow++;
}

// Establish new unit values
var establishUnitValues = function() {
  var timeRemaining = timeSnapshot-timeNow;
  daysLeft = parseInt(timeRemaining/60/60/24,10);
  hoursLeft = parseInt((timeRemaining-(daysLeft*60*60*24))/60/60,10);
  minsLeft = parseInt((timeRemaining-(daysLeft*60*60*24)-(hoursLeft*60*60))/60,10);
  secsLeft = parseInt(timeRemaining-(daysLeft*60*60*24)-(hoursLeft*60*60)-(minsLeft*60),10);
  // Set values in DOM elems
  $('#daysLeft').text(daysLeft);
  $('#hoursLeft').text(hoursLeft);
  $('#minsLeft').text(minsLeft);
  $('#secsLeft').text(secsLeft);
  $('#counterMobile').html(daysLeft+" days, "+hoursLeft+" hours<br>"+minsLeft+" mins, "+secsLeft+" secs");

  // Set styles for DOM elems based on unit values
  setUnitStyles('days',5);
  setUnitStyles('hours',12);
  setUnitStyles('mins',30);
  setUnitStyles('secs',30);

  // If we haven't set arcs around units yet, set animation delay offsets
  if (!setArcs) {
    setAnimationDelays('days',((daysLeft*60*60*24)-(10*60*60*24)+2)+"s");
    setAnimationDelays('hours',((hoursLeft*60*60)-(24*60*60)+2)+"s");
    setAnimationDelays('mins',((minsLeft*60)-(60*60)+2)+"s");
    setAnimationDelays('secs',(secsLeft-60+2)+"s");
    // Fade in counter box now
    fadeInCounterBox();
    // Set flag so we don't get here again
    setArcs = true;
  }
}

// Set unit styles for various DOM elems for it
var setUnitStyles = function(unit,halfUnit) {
  document.getElementById(unit+'Counter').style.marginLeft = window[unit+'Left'] <= halfUnit ? "60px" : "0";
  document.getElementById(unit+'Counter').style.marginRight = window[unit+'Left'] <= halfUnit ? "-60px" : "0";
  document.getElementById(unit+'Wrapper').style.left = window[unit+'Left'] <= halfUnit ? "-60px" : "0";
  document.getElementById(unit+'Filler').style.opacity = window[unit+'Left'] <= halfUnit ? "0" : "1";
  document.getElementById(unit+'Left').style.marginLeft = window[unit+'Left'] <= halfUnit ? "-60px" : "0";
  document.getElementById(unit+'Text').style.marginLeft = window[unit+'Left'] <= halfUnit ? "-60px" : "0";
}

// Set animation delays for 3 DOM elems for unit
var setAnimationDelays = function(unit,delay) {
  document.getElementById(unit+'Spinner').style.animationDelay =
  document.getElementById(unit+'Filler').style.animationDelay =
  document.getElementById(unit+'Mask').style.animationDelay =
  delay;
}

// Fade in the counter box
var fadeInCounterBox = function() {
  $('#counterBox').css('opacity', 1);
}

// Show the awaiting next block message
var showAwaitingBlock = function() {
  document.getElementById('counterBox').style.display = 'none';
  document.getElementById('awaitingBlock').style.display = 'block';
  document.getElementById('confetti').style.display = 'none';
  document.getElementById('snapshotBox').style.display = 'none';
  // Get the current block height
  $.get("https://zcl-explorer.com/api/status?q=getInfo&timestamp="+Date.now(), function(data) {
    // Set it and display awaiting next block message containing the block height we're waiting for
    initialBlock = data.info.blocks;
    document.getElementById('awaitingBlock').innerHTML = "Awaiting discovery<br>of next block ("+(initialBlock+1)+")...";
  });
  // Poll every 10 secs to check if we've discovered that next block height yet
  var getZCLDataPolling = setInterval(function() {
      $.get("https://zcl-explorer.com/api/status?q=getInfo&timestamp="+Date.now(), function(data) {
      if (data.info.blocks != initialBlock) {
        clearInterval(getZCLDataPolling);
        showConfetti();
      }
      });
  },10000);
}

// Show confetti and snapshot message
var showConfetti = function() {
  document.getElementById('counterBox').style.display = 'none';
  document.getElementById('awaitingBlock').style.display = 'none';
  document.getElementById('confetti').style.display = 'block';
  document.getElementById('snapshotBox').style.display = 'block';
}

// Testing snapshot
// timeNow = timeSnapshot;

