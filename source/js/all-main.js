/*
'use strict';
// Адрес
var DIR = 'http://localhost:3000/';

// Меняет src сеты главной картинки на основе события клика по превьюшке
  var changeSrcsets = function (onTabLinkClickEvent, slideId, url) {
    // Разметка
    var pictureTag = document.querySelector('picture');
    var set = pictureTag.innerHTML.split('-big.jpg', 1); // (<source media="(min-width: 660px)" srcset="img/) - 47 символов
    var srcSets = pictureTag.querySelectorAll('source');
    var srcSetImg = pictureTag.querySelector('img');

    // Меняем srcset'ы
    var replaceThis = set[0].slice(47); // Старая картинка

    var newPicture = slideId ? url.slice(4, -1) + slideId : onTabLinkClickEvent.target.src.slice((DIR.length + 4), -4);
    var re = new RegExp(replaceThis, "g"); // Все совпадения
    for (var i = 0; i < srcSets.length; i++) {
      var oldSet = srcSets[i].srcset; // Разметка до замены
      var newSet = oldSet.replace(re, newPicture); // Разметка после замены
      srcSets[i].srcset = newSet;
    }
  };

var content = document.querySelector('.main');
var lightbox = document.querySelector('.lightbox');
var container = lightbox.querySelector('.lightbox__container');
var closeButton = document.querySelector('.lightbox__close');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ResponsiveBackgroundImage = function () {
  function ResponsiveBackgroundImage(element) {
    _classCallCheck(this, ResponsiveBackgroundImage);

    this.element = element;
    this.img = element.querySelector('.lightbox__img');
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

content.addEventListener('click', function (e) {

  var wasActive = document.querySelector('.tabs__tab--active');

  if (wasActive) {
    wasActive.classList.remove('tabs__tab--active');
  }

  e.target.parentElement.classList.add('tabs__tab--active');
  changeSrcsets(e);

  new ResponsiveBackgroundImage(container);

  if(lightbox.style.opacity = '0') {
    lightbox.style.transitionDelay="0.2s"
    lightbox.style.opacity = '1';
    lightbox.style.zIndex = '1';
  }
});

closeButton.addEventListener('click', function () {
  lightbox.style.opacity = '0';
  setTimeout(function() {
    lightbox.style.zIndex = '-1';
  }, 600);
});

(function () {
  var openButton = document.querySelector('.main-header__menu-button');
  var closeButton = document.querySelector('.main-nav__close');

  var menuToggle = function (state) {
    var menu = document.querySelector('.main-nav');
    var links = document.querySelectorAll('.main-nav__item');
    var translate = 20;

    var parcer = function () {
      for (var i = 0; i < links.length; i++) {
        links[i].style.transform = 'translateY(' + translate + 'px)';
        translate += 10;
      }
    };

    switch(state){
      case 'open':
        parcer();
        menu.style.zIndex = '10';
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        for (var i = 0; i < links.length; i++) {
          links[i].style.transform = 'translateY(0)';
        }
        break;
      case 'close':
        menu.style.opacity = '0';
        menu.style.zIndex = '0';
        menu.style.visibility = 'hidden';
        parcer();
        break;
    }
  };

  openButton.addEventListener('click', function () {
    menuToggle('open')
  });
  closeButton.addEventListener('click', function () {
    menuToggle('close')
  });

  window.menuToggle = menuToggle;
})();
*/