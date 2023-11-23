const speech = window.speechSynthesis;
let ctx = null;

// translate normal text to morse code
function translateText(e) {
  const inputEl = document.querySelector('#textInput');
  const outputEl = document.querySelector('#morseInput');
  let textString = inputEl.value.toUpperCase();
  let morseString = '';
  for (i = 0; i < textString.length; i++) {
    let newChar = Translations[textString[i]];
    morseString += (newChar ? newChar : textString[i] === ' ' ? '/' : '#') + ' ';
  }
  outputEl.value = morseString.trim();
  prepareSound(morseString);
  charsetTransition(charsetB);
}

// translate morse code to normal text
function translateMorse(e) {
  const inputEl = document.querySelector('#morseInput');
  const outputEl = document.querySelector('#textInput');
  const morseKeys = Object.values(Translations);
  const textValues = Object.keys(Translations);
  let morseString = inputEl.value.split(' ');
  let textString = '';
  morseString.forEach(word => {
    let newChar = ' ';
    if (word && word != '/') {
      newChar = textValues[morseKeys.indexOf(word)] || '#';
    }
    textString += newChar;
  });
  outputEl.value = textString;
  readText(textString);
  charsetTransition(charsetA);
}

// read out normal text using the Web Speech API
function readText(textString) {
  if (ctx) {
    ctx.close();
    ctx = false;
    const button = document.querySelector('#play'); 
    button.style.visibility = 'hidden';
  }
  speech.cancel();
  const toRead = new SpeechSynthesisUtterance(textString);
  speech.speak(toRead);
}

// prepare and play morse code audio using the Web Audio API
function prepareSound(morse) {
  if (ctx) {
    ctx.close();
    ctx = false;
  }
  speech.cancel();
  ctx = new AudioContext();
  const morseArr = morse.split(' / ');
  let t = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 600;
  
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0, t);
  // set at which point the sound should play or be silent in accordance to the morse code text
  morseArr.forEach(word => {
    for (i = 0; i < word.length; i++) {
      switch (word[i]) {
        case ' ':
          t += unitLength * letterUnits;
          break;
        case '.':
          gainNode.gain.setValueAtTime(1, t);
          t += unitLength * dotUnits;
          gainNode.gain.setValueAtTime(0, t);
          break;
        case '-':
          gainNode.gain.setValueAtTime(1, t);
          t += unitLength * dashUnits;
          gainNode.gain.setValueAtTime(0, t);
          break;
      }
      
      if (word[i] !== ' ' && word[i+1] && word[i+1] !== ' ') {
        t += unitLength * innerUnits;
      }
    }
    t += unitLength * wordUnits;
  });
  oscillator.connect(gainNode).connect(ctx.destination);
  oscillator.start();
  oscillator.stop(t);
  const button = document.querySelector('#play');
  button.style.visibility = 'visible';
  button.dataset.playing = "true";
  button.innerText = "Pause";
  oscillator.addEventListener('ended', () => {
    ctx.close();
    ctx = false;
    button.style.visibility = 'hidden';
  });
}

// pause or resume the morse code audio
function playPause() {
  const playButton = document.querySelector('#play');
  if (playButton.dataset.playing == "true") {
    if (ctx) {
      ctx.suspend();
    }
    else {
      speech.pause();
    }
    playButton.dataset.playing = "false";
    playButton.innerText = "Play";
  }
  else {
    if (ctx) {
      ctx.resume(); 
    }
    else {
      speech.resume();
    }
    playButton.dataset.playing = "true";
    playButton.innerText = "Pause";
  }
  console.log(speech.speaking);
}
