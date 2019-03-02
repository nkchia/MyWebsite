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
    $("expButton").onclick = setExp;
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

  function setExp() {
    let target = $("experience");
    target.style.height = "200px";
  }

  /*
  function setup() {
    let url = "http://students.washington.edu/nkchia/myweb.php";
    url += "?mode=setup";

    fetch(url)
      .then(checkStatus)
      .then(function(response) {
        let json = JSON.parse(response);
        for (let i = 0; i < json.length; i++){
          let newHeader = document.createElement("h2");
          let newText = document.createTextNode(json[i]["trait"]);
          newHeader.appendChild(newText);
          document.querySelector("main").appendChild(newHeader);

          let newDiv = document.createElement("div");
          newText = document.createTextNode(json[i]["text"]);
          newDiv.appendChild(newText);
          newDiv.classList.add("collapsed");
          document.querySelector("main").appendChild(newDiv);

          newHeader.onclick = expand.bind(this, newDiv);
        }
      })
      .catch(function(error) {

      });
    }


  function expand(div) {
    if (div.classList.contains("expanded")) {
      collapse(div);
    } else {
      collapseAll();

      div.classList.remove("collapsed");
      div.classList.add("expanded");
    }
  }

  function collapse(div) {
    div.classList.remove("expanded");
    div.classList.add("collapsed");
  }

  function collapseAll() {
    let expandables = qsa("div");
    for (let i = 0; i < expandables.length; i++) {
      if (!expandables[i].classList.contains("collapsed")) {
        expandables[i].classList.remove("expanded");
        expandables[i].classList.add("collapsed");
      }
    }
  }
  */

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
