function load() {
  generateVisuals(250);
}

function generateVisuals(count) {
  const vContainer = document.querySelector('.lowerVisuals');
  vContainer.innerHTML = '';
  const maxW = vContainer.clientWidth;
  const normalW = maxW / count;
  const maxH = vContainer.clientHeight;
  const minH = maxH / 3;
  const heightDeviation = maxH - minH;
  let remainingWidth = maxW;
  for (let i = 0; i < count; i++) {
    const newEl = document.createElement('span');
    newEl.classList.add('visBeam');

    const beamWidth = normalW + Math.random() * Math.min(remainingWidth, normalW / 2);
    remainingWidth -= normalW - beamWidth;
    newEl.style.width = beamWidth;

    const beamHeight = minH + Math.random() * heightDeviation;
    newEl.style.height = beamHeight;
    newEl.style.top = maxH - beamHeight;

    newEl.style.backgroundColor = `rgb(${remainingWidth % 255}, ${beamWidth % 255}, ${beamHeight % 255})`;

    // newEl.textContent = i;
    // newEl.style.color = '#fff';
    const animLength = (Math.random() * 1000) + 1000;
    const animEndPoint = Math.random() * (heightDeviation - 20) + minH;
    const beamAnim = [
      { 
        top: animEndPoint, 
        height: maxH - animEndPoint
      },
      { 
        top: maxH-beamHeight,
        height: beamHeight
      }
    ];
    const anim2 = [
      { transform: `rotate(${Math.random() * 360}deg)`},
      { transform: `rotate(${Math.random() * 360}deg)`},
    ]
    newEl.animate(beamAnim, { duration: animLength, iterations: Infinity, direction: Math.round(Math.random()) ? 'alternate' : 'alternate-reverse', easing: 'ease-in-out'});

    vContainer.appendChild(newEl);
  }
}
