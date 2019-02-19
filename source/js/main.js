'use strict';
var tabLinks = document.querySelector('.tabs');

var imgContainer = document.querySelector('.image-container__wrapper');
var mainPic = document.querySelector('.image-container__bgpic');

tabLinks.addEventListener('click', function (e) {
  if(mainPic.style.display = 'none') {
    mainPic.style.display = 'block';
  }

  // Удаляет слайдер если есть
  var oldSlider = imgContainer.querySelector('.slider-container');
  if (oldSlider) {
    oldSlider.remove();
  }

  var src = e.target.src.slice(0,-4) + '-full.jpg';
  mainPic.style.backgroundImage = 'url(' + src + ')';

  // Если слайдер (div.tab содержит текст)
  if (e.target.parentElement.textContent.startsWith('slider')) {
    // Количество слайдов
    var slidesAmount = Number(e.target.parentElement.innerText.charAt(7));
    mainPic.style.display = 'none';
    // Ссылка
    var slideSrc = e.target.src.slice(window.data.DIR.length, -5);

    // Отрисовка слайдера
    window.funcs.renderSlider(slidesAmount, slideSrc);
  }
  window.showDescription(e);
});
