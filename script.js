function load() {
  const prevBtns = document.querySelectorAll('.pics-prev');
  for (let i = 0; i < prevBtns.length; i++) {
    prevBtns[i].addEventListener('click', function (e) {
      const imgEl = this.parentNode.querySelector('.pic-group1.pic-visible');
      const hiddenEls = this.parentNode.querySelectorAll('.pic-group1.pic-hidden');
      let currentNum = imgEl.getAttribute('value');
      if (currentNum == 1) {
        currentNum = 3;
      }
      else {
        currentNum--;
      }
      imgEl.classList.remove('pic-visible');
      imgEl.classList.add('pic-hidden');
      for (let i = 0; i < hiddenEls.length; i++) {
        if (hiddenEls[i].getAttribute('value') == currentNum) {
          hiddenEls[i].classList.add('pic-visible');
          hiddenEls[i].classList.remove('pic-hidden');
        }
      }
    });
  }

  const nextBtns = document.querySelectorAll('.pics-next');
  for (let i = 0; i < nextBtns.length; i++) {
    nextBtns[i].addEventListener('click', function (e) {
      const imgEl = this.parentNode.querySelector('.pic-group1.pic-visible');
      const hiddenEls = this.parentNode.querySelectorAll('.pic-group1.pic-hidden');
      let currentNum = imgEl.getAttribute('value');
      if (currentNum == 3) {
        currentNum = 1;
      }
      else {
        currentNum++;
      }
      imgEl.classList.remove('pic-visible');
      imgEl.classList.add('pic-hidden');
      for (let i = 0; i < hiddenEls.length; i++) {
        if (hiddenEls[i].getAttribute('value') == currentNum) {
          hiddenEls[i].classList.add('pic-visible');
          hiddenEls[i].classList.remove('pic-hidden');
        }
      }
    });
  }

  const imgElements = document.querySelectorAll('.item-pic');
  const modalEl = document.querySelector('.modal-container');
  const modalImg = document.querySelector('.modal-img');
  for (let i = 0; i < imgElements.length; i++) {
    imgElements[i].addEventListener('click', function (e) {
      modalImg.src = this.src;
      modalImg.alt = this.alt;
      modalImg.style.transform = 'scale(1)';
      modalEl.classList.remove('modal-hidden');
    });
  }

  modalEl.addEventListener('click', function (e) {
    modalEl.classList.add('modal-hidden');
    modalImg.style.transform = 'scale(0)';
  })
}
