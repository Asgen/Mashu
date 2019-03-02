'use strict';
(function () {
  // Адрес
  var DIR = 'http://localhost:3000/';

  // Desktop брэйкпоинт
  //var DESKTOP_WIDTH = 960;

  // Swipe data
  var Swipe = {
    TOUCH_START_COORDS: {'x':-1, 'y':-1},
    TOUCH_END_COORDS: {'x':-1, 'y':-1},
    DIRECTION: 'undefined',
    MIN_DISTANCE_X_AXIS: 30,
    MAX_DISTANCE_Y_AXIS: 30,
    MAX_ALLOWED_TIME: 1000,
    START_TIME: 0,
    ELAPSED_TIME: 0
  };

  // Меняет src сеты главной картинки на основе события клика по превьюшке
  var changeSrcsets = function (onTabLinkClickEvent, slideId, url) {
    // Разметка
    var pictureTag = document.querySelector('picture');
    var set = pictureTag.innerHTML.split('-big.jpg', 1); // (<source media="(min-width: 660px)" srcset="img/) - 47 символов
    var srcSets = pictureTag.querySelectorAll('source');
    var srcSetImg = pictureTag.querySelector('img');

    // Меняем srcset'ы
    var replaceThis = set[0].slice(47); // Старая картинка

    var newPicture = slideId ? url.slice(4, -1) + slideId : onTabLinkClickEvent.target.src.slice((window.data.DIR.length + 4), -4);
    var re = new RegExp(replaceThis, "g"); // Все совпадения
    for (var i = 0; i < srcSets.length; i++) {
      var oldSet = srcSets[i].srcset; // Разметка до замены
      var newSet = oldSet.replace(re, newPicture); // Разметка после замены
      srcSets[i].srcset = newSet;
    }
  };

  window.data = {
    DIR: DIR,
    //DESKTOP_WIDTH: DESKTOP_WIDTH,
    Swipe: Swipe,
    changeSrcsets: changeSrcsets
  };
})();
