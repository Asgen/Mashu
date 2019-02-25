'use strict';
var tabLinks = document.querySelector('.tabs');

var imgContainer = document.querySelector('.image-container__wrapper');
var mainPic = document.querySelector('.image-container__bgpic');

class ResponsiveBackgroundImage {
    constructor (element) {
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

    update () {
        let src = typeof this.img.currentSrc !== 'undefined' ? this.img.currentSrc : this.img.src;
        if (this.src !== src) {
            this.src = src;
            this.element.style.backgroundImage = 'url("' + this.src + '")';

        }
    }
}

tabLinks.addEventListener('click', function (e) {

  var pictureTag = document.querySelector('picture');
  // Разметка
  var set = pictureTag.innerHTML.split('-big.jpg', 1); // (<source media="(min-width: 660px)" srcset="img/) - 47 символов

  // Меняем src
  var replaceThis = set[0].slice(47); // Старая картинка
  var newPicture = e.target.src.slice((window.data.DIR.length + 4), -4); // +4 это "img/", -4 это ".jpg"
  console.log(replaceThis);
  var re = new RegExp(replaceThis, "g"); // Все совпадения
  var oldSet = pictureTag.innerHTML; // Разметка до замены
  var newSet = oldSet.replace(re, newPicture); // Разметка после замены
  //console.log(pictureTag.innerHTML);

  pictureTag.innerHTML = newSet; // Вставляем с новыми ссылками

  

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
    mainPic.style.display = 'none';
    // Ссылка
    var slideSrc = e.target.src.slice(window.data.DIR.length, -5);

    // Отрисовка слайдера
    window.funcs.renderSlider(slidesAmount, slideSrc);
  }

  window.showDescription(e);


  // Установка фона из src-set'a
  new ResponsiveBackgroundImage(mainPic);

});
