const ctx = new AudioContext();
let audioSample = null;

// fetch and prepare the audio file to use for the keyboard
function initialize() {
  fetch('content/C4.wav')
  .then((response) => response.arrayBuffer())
  .then((buffer) => ctx.decodeAudioData(buffer))
  .then((sample) => {
    audioSample = sample;
  });
  initEffects();
}

// play a sound at the given pitch
function playSound(val) {
  const source = ctx.createBufferSource();
  source.buffer = audioSample;
  source.detune.value = val * 100;
  source.connect(ctx.destination);
  source.start();
}

// handler to play a sound when a note is pressed using the pointer
function buttonDown(e) {
  playSound(e.target.getAttribute('value'));
  pressEffect(e.target);
}

// handler to play a sound when a key is pressed on the keyboard
function keyDown(e) {
  let val = 0;
  // set the pitch based on the keycode of the key pressed
  switch (e.keyCode) {
    case 65:
      val = -14;
      break;
    case 87:
      val = -13;
      break;
    case 83:
      val = -12;
      break;
    case 69:
      val = -11;
      break;
    case 68:
      val = -10;
      break;
    case 70:
      val = -8;
      break;
    case 84:
      val = -7;
      break;
    case 71:
      val = -6;
      break;
    case 89:
      val = -5;
      break;
    case 72:
      val = -4;
      break;
    case 85:
      val = -3;
      break;
    case 74:
      val = -2;
      break;
    case 75:
      val = 0;
      break;
    case 79:
      val = 1;
      break;
    case 76:
      val = 2;
      break;
    case 80:
      val = 3;
      break;
    case 59:
      val = 4;
      break;
    default:
      return;
  }
  playSound(val);
  const keyId = e.keyCode == 59 ? 'Semi' : e.key;
  const keyEl = document.querySelector(`#key${keyId}`);
  // play the animation for pressing a key
  keyEl.animate([{ borderStyle: 'inset' },{ borderStyle: 'inset' }], { duration: 200, iterations: 1 });
  pressEffect(keyEl);
  e.stopPropagation();
  e.preventDefault();
}
