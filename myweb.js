// Ning Kang Chia
"use strict";

// Timer for text-changing title.
let displayTimer;

// All potential titles.
let phrases = ["Simplistic Style.",
    "Interested in NLP.",
    "Junior.",
    "From Malaysia.",
    "Acquired a taste for pointers."];

(function() {
  window.onload = function() {
    setup();
  };

  // Start to cycle through the different titles
  // and assign buttons to appropriate functions.
  function setup() {
    waitDisplay();
    assignButtons();

    // Not yet implemented; see further below.
    // getFields();
  }

  // Keeps the title from changing.
  function waitDisplay() {
    displayTimer = setTimeout(reduceText, 3000);
  }

  // Changes title
  function reduceText(){
    displayTimer = setInterval(reduceStep, 70);
  }

  // Removes a letter from the title. If the title has <= 1
  // character, add letters to title instead.
  function reduceStep() {
    let changeLength = qs("#display p").innerHTML.length;
    if (changeLength <= 1) {
      clearInterval(displayTimer);
      increaseText();
    } else {
      qs("#display p").innerHTML = qs("#display p").innerHTML.substring(0, changeLength - 2) + "|";
    }
  }

  // Chooses a random title and changes the title letter by letter
  function increaseText(){
    let index = Math.floor(Math.random() * phrases.length);
    let targetPhrase = phrases[index];

    displayTimer = setInterval(increaseStep, 70, targetPhrase);
  }

  // Takes in a string and changes the title letter by letter
  function increaseStep(targetPhrase) {
    let changeLength = qs("#display p").innerHTML.length - 1;
    if (targetPhrase.length == changeLength) {
      clearInterval(displayTimer);
      waitDisplay();
    } else {
      qs("#display p").innerHTML = targetPhrase.substring(0, changeLength + 1) + "|";
    }
  }

  // Maps event listeners to specific buttons to expand specific sections.
  function assignButtons() {
    $("projButton").addEventListener('click', function(){toggle('projSection');});
    $("expButton").addEventListener('click', function(){toggle('expSection');});
    $("skillButton").addEventListener('click', function(){toggle('skillSection');});
    $("extButton").addEventListener('click', function(){toggle('extSection');});
  }

  // Takes in a string representing a specific section's id and
  // 1. Expands the section if not expanded
  // 2. Collapses the section if its the only section expanded
  // 3. If another section is expanded, collapses that section
  //    and expands the given section.
  function toggle(sectionId) {
    let targetSection = $(sectionId);
    let expanded = qs(".expanded");
    if (targetSection.classList.contains("collapsed")) {
      if (expanded != null) {
        expanded.classList.remove("expanded");
        expanded.classList.add("collapsed");
      }
      targetSection.classList.remove("collapsed");
      targetSection.classList.add("expanded");
    } else {
      targetSection.classList.remove("expanded");
      targetSection.classList.add("collapsed");
    }
  }

  // Unfinished implementation of dynamically setting the
  // contents in the sections through php.
  // It is intended to create the DOM elements in real time
  // based on information uploaded on server such as format
  // style and content.
  /*
  function getFields() {
    let url = "http://students.washington.edu/nkchia/myweb.php";
    url += "?mode=setup";

    fetch(url)
      .then(checkStatus)
      .then(function(responseText) {
        let json = responseText.parse();

        for (let i = 0; i < json.length; i++){
          let toBeAdded = document.createElement("h2");
          let toBeText = document.createTextNode(json[i]["trait"]);
          toBeAdded.appendChild(toBeText);
          document.querySelector("main").appendChild(toBeAdded);
        }

        let toBeAdded = document.createElement("h2");
        let toBeText = document.createTextNode(responseText);
        toBeAdded.appendChild(toBeText);
        document.querySelector("main").appendChild(toBeAdded);
      })
      .catch(function(error) {

      });
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

  function checkStatus(response){
    if (response.status >= 200 && response.status < 300) {
      return response.text();
    } else {
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }
})();
