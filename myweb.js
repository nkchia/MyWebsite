"use strict";

let displayTimer;
let phrases = ["Simplistic Style.",
    "Interested in NLP.",
    "Sophomore.",
    "From Malaysia."];

(function() {
  window.onload = function() {
    setup();
  };

  function setup() {
    waitDisplay();
  }

  function waitDisplay() {
    displayTimer = setTimeout(reduceText, 3000);
  }

  function reduceText(){
    displayTimer = setInterval(reduceStep, 70);
  }

  function increaseText(){
    let index = Math.floor(Math.random() * phrases.length);
    let targetPhrase = phrases[index];

    displayTimer = setInterval(increaseStep, 70, targetPhrase);
  }

  function reduceStep() {
    let changeLength = qs("#display p").innerHTML.length;
    if (changeLength <= 1) {
      clearInterval(displayTimer);
      increaseText();
    } else {
      qs("#display p").innerHTML = qs("#display p").innerHTML.substring(0, changeLength - 2) + "|";
    }
  }

  function increaseStep(targetPhrase) {
    let changeLength = qs("#display p").innerHTML.length - 1;
    if (targetPhrase.length == changeLength) {
      clearInterval(displayTimer);
      waitDisplay();
    } else {
      qs("#display p").innerHTML = targetPhrase.substring(0, changeLength + 1) + "|";
    }
  }

  //Helper Functions
  function $(id) {
    return document.getElementById(id);
  }

  function qs(selector) {
    return document.querySelector(selector);
  }

  function qsa(selector) {
    return document.querySelectorAll(selector);
  }
})();
