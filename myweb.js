let displayTimer;
let phrases = ["Simplistic Style.",
    "Interested in NLP.",
    "Sophomore.",
    "From Malaysia."];

$(document).ready(function(){
    setup();
});

function setup() {
  waitDisplay();
  $("#expButton").click(setExp);
}

function waitDisplay() {
  displayTimer = setTimeout(reduceText, 3000);
}

function reduceText(){
  displayTimer = setInterval(reduceStep, 70);
}

function reduceStep() {
  let changeLength = $("#display p").html().length;
  if (changeLength <= 1) {
    clearInterval(displayTimer);
    increaseText();
  } else {
    $("#display p").html($("#display p").html().substring(0, changeLength - 2) + "|");
  }
}

function increaseText(){
  let index = Math.floor(Math.random() * phrases.length);
  let targetPhrase = phrases[index];

  displayTimer = setInterval(increaseStep, 70, targetPhrase);
}

function increaseStep(targetPhrase) {
  let changeLength = $("#display p").html().length - 1;
  if (targetPhrase.length == changeLength) {
    clearInterval(displayTimer);
    waitDisplay();
  } else {
    $("#display p").html(targetPhrase.substring(0, changeLength + 1) + "|");
  }
}

function setExp() {
  $("#experience").removeClass("hidden");
  $("#experience div:first").addClass("visible");
  $("#experience").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
    function(e) {

  });
}
