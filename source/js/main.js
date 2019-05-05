'use strict';
var tabLinks = document.querySelector('.tabs');

var imgContainer = document.querySelector('.image-container__wrapper');
var mainPic = document.querySelector('.image-container__bgpic');

// Картинка openGraph
var meta = document.querySelectorAll('meta');
var metaImg;
for (var i = 0; i < meta.length; i++) {
  if (meta[i].attributes.property && meta[i].attributes.property.value === 'og:image') {
    metaImg = meta[i];
  }
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResponsiveBackgroundImage = function () {
  function ResponsiveBackgroundImage(element) {
    _classCallCheck(this, ResponsiveBackgroundImage);

    this.element = element;
    this.img = element.querySelector('.source-img');
    this.src = '';
    var that = this;

    this.img.addEventListener('load', function () {
        that.update();
    });

    if (this.img.complete) {
        this.update();
    }
  }

  ResponsiveBackgroundImage.prototype.update = function update() {
    let src = typeof this.img.currentSrc !== 'undefined' ? this.img.currentSrc : this.img.src;
    if (this.src !== src) {
        this.src = src;
        this.element.style.backgroundImage = 'url("' + this.src + '")';
    }
  };

  return ResponsiveBackgroundImage;
}();

tabLinks.addEventListener('click', function (e) {
  var wasActive = document.querySelector('.tabs__tab--active');

  if (wasActive) {
    wasActive.classList.remove('tabs__tab--active');
  }

  e.target.parentElement.classList.add('tabs__tab--active');
  window.data.changeSrcsets(e);

  // Подстановкка openGraph
  metaImg.content = mainPic.style.backgroundImage.slice(5, -2);

  if(mainPic.style.display = 'none') {
    mainPic.style.display = 'block';
  }

  // Удаляет слайдер если есть
  var oldSlider = imgContainer.querySelector('.slider-container');
  if (oldSlider) {
    oldSlider.remove();
  }

  // Если слайдер (div.tab содержит текст)
  if (e.target.parentElement.textContent.startsWith('slider')) {
    // Количество слайдов
    var slidesAmount = Number(e.target.parentElement.innerText.charAt(7));
    // Ссылка
    var slideSrc = e.target.src.slice(window.data.DIR.length, -4); // img/indi-cow-1(.jpg)
    // Отрисовка слайдера
    window.funcs.renderSlider(slidesAmount, slideSrc);
}

  window.showDescription(e);
  // Установка фона из src-set'a
  new ResponsiveBackgroundImage(mainPic);
});
