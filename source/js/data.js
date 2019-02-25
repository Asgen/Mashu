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

  window.data = {
    DIR: DIR,
    //DESKTOP_WIDTH: DESKTOP_WIDTH,
    Swipe: Swipe
  };
})();
