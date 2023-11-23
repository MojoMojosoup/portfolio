const effectAnim ={ opacity: [.1, 0.2, 0], transform: ['scale(1)', 'scale(6)']};

// generate the elements used for the key press animations
function initEffects() {
  const nKeys = document.querySelectorAll('.key-normal');
  nKeys.forEach(keyEl => {
    const newEffect = document.createElement('span');
    newEffect.classList.add('key-normal-effect');
    newEffect.id = keyEl.id + 'Effect';
    keyEl.append(newEffect);
  });
  const oKeys = document.querySelectorAll('.key-odd');
  oKeys.forEach(keyEl => {
    const newEffect = document.createElement('span');
    newEffect.classList.add('key-odd-effect');
    newEffect.id = keyEl.id + 'Effect';
    keyEl.append(newEffect);
  });
}

// play an animation on the corrosponding key's animation element
function pressEffect(keyEl) {
  let effectEl = document.querySelector(`#${keyEl.id}Effect`);
  effectEl.animate(effectAnim, {
    duration: 300,
    iterations: 1,
    composite: "replace",
    easing: 'ease',
  })
}
