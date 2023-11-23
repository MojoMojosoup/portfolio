const charsetA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charsetB = '.-';
let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let textEl = document.querySelector('.bgText');
let linesArr = [];
let currentText = '';
let perLine = 0;
let lineHeight = 0;
let intervalId = 0;

const randomChar = () => chars[Math.floor(Math.random() * chars.length)];
const randomString = length => Array.from(Array(length)).map(randomChar).join("");

function loadStyle() {
  textEl = document.querySelector('.bgText');
  initText();
}

function initText() {
  let id = setTimeout(() => {}, 0);
  // clear all timeouts
  while (id--) {
    if (id == intervalId) {
      continue; 
    }
    clearTimeout(id);
  }
  linesArr = [];
  charsPerLine();     // get amount of characters that fit on one line
  const lines = document.body.clientHeight / lineHeight;  // get amount of lines based on line height
  for (let l = 0; l < lines; l++) {
    // generate strings of characters for each line
    linesArr.push(randomString(perLine));
  }
  textEl.innerHTML = '';
  linesArr.forEach((line, i) => {
    // generate elements for the background
    const lineEl = document.createElement('span');
    lineEl.classList.add('textLine');
    lineEl.id = `line${i}`;
    lineEl.innerHTML = line;
    textEl.append(lineEl);
  });
}

// get the minimum amount of characters required to fill a line using an invisible element with 1 character 
function charsPerLine() {
  const measureEl = document.querySelector('.textMeasure');
  const charWidth = measureEl.clientWidth;
  const charCount = textEl.clientWidth / charWidth;
  lineHeight = measureEl.clientHeight;
  perLine = Math.ceil(charCount + 5);
}

// animation for transitioning the background between charsets
function charsetTransition(newChars) {
  chars = newChars;
  for (let r = 0; r < linesArr.length; r++) {
    for (let c = 0; c < linesArr[r].length; c++) {
      // replace all characters with new ones with small random delays inbetween
      setTimeout(() => {
        linesArr[r] = linesArr[r].substring(0, c) + randomChar() + linesArr[r].substring(c+1);
        const lineEl = document.querySelector(`#line${r}`);
        lineEl.innerHTML = linesArr[r];
      }, Math.floor(Math.random() * 20));
    }
  }
}

// animation to randomly shuffle text of buttons rapidly when hovering
function buttonEffect(e, orig) {
  const texts = [ orig ];
  const steps = 4;
  chars = charsetA;
  for (let i = 0; i < steps; i++) {
    texts.push(randomString(orig.length).toLocaleLowerCase());
  }
  texts.push(orig);
  setTimeout(textCycle(e.target, 0, texts), 0);
}

// recursive function to change characters to every entry in an array
function textCycle(element, index, arr) {
  setTimeout(() => {
    element.textContent = arr[index]
    if (index < arr.length - 1) {
      textCycle(element, index + 1, arr);
    }
  }, 25);
}
