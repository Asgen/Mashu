(function () {
  // Swipe
  var cons = window.data.Swipe;
  // Create a new 'change' event
  var changeEvent = new Event('change');
  var swipeStart = function (e) {
    e = e ? e : window.event;
    e = ('changedTouches' in e)?e.changedTouches[0] : e;
    cons.TOUCH_START_COORDS = {'x':e.pageX, 'y':e.pageY};
    cons.START_TIME = new Date().getTime();
  };

  var swipeMove = function (e){
    e = e ? e : window.event;
  };

  var swipeEnd = function (e, slides) {
    var inputs = document.querySelectorAll('input[type="radio"]');
    var radioOn = document.querySelector('input[type="radio"]:checked');
    var index;
    e = e ? e : window.event;
    e = ('changedTouches' in e)?e.changedTouches[0] : e;
    cons.TOUCH_END_COORDS = {'x':e.pageX - cons.TOUCH_START_COORDS.x, 'y':e.pageY - cons.TOUCH_START_COORDS.y};
    cons.ELAPSED_TIME = new Date().getTime() - cons.START_TIME;
    if (cons.ELAPSED_TIME <= cons.MAX_ALLOWED_TIME){
      if (Math.abs(cons.TOUCH_END_COORDS.x) >= cons.MIN_DISTANCE_X_AXIS && Math.abs(cons.TOUCH_END_COORDS.y) <= cons.MAX_DISTANCE_Y_AXIS){
        cons.DIRECTION = (cons.TOUCH_END_COORDS.x < 0)? 'left' : 'right';
        switch(cons.DIRECTION){
          case 'left':
            index = radioOn.id.charAt(8);
            if (Number(index) === slides) {
              index = 0;
            }
            inputs[index].checked = true; // Т.к. не отняли еденицу от индекса, то это уже нужный идекс следующего слайда
            // Симулировать событие
            inputs[index].dispatchEvent(changeEvent);
            break;
          case 'right':
            index = Number(radioOn.id.charAt(8)) - 2;
            if ((index + 1) === 0) {
              index = slides -1 ;
            }
            inputs[index].checked = true; // Т.к. не отняли еденицу от индекса, то это уже нужный идекс следующего слайда
            // Симулировать событие
            inputs[index].dispatchEvent(changeEvent);
            break;
        }
      }
    }
  };

  var addMultipleListeners = function (el, s, fn) {
    var evts = s.split(' ');
    for (var i=0, iLen=evts.length; i<iLen; i++) {
      el.addEventListener(evts[i], fn, false);
    }
  };
  // end Swipe

  var renderSlider = function (slides, url) {
    // Получение из шаблона
    var sliderTemplate = document.querySelector('#slider')
    .content
    .querySelector('.slider-container');

    var slider = sliderTemplate.cloneNode(true);
    //var wrapper = slider.querySelector('.wrapper');
    var controlSection = slider.querySelector('.slider');
    var controls = slider.querySelector('.slider-controls');
    var sliderList = slider.querySelector('.slider-list');

    for (var i = 0; i < slides; i++) {

      // Создать input
      var input = document.createElement('input');
      input.classList.add('visually-hidden');
      input.type = 'radio';
      input.id = 'product-' + (i+1);
      input.name = 'toggle';
      if(i === 0) {
        input.checked = true;
      }
      slider.insertBefore(input, controlSection);
      // Смена слайдов при смене radio-button
      input.addEventListener('change', function (evt) {onInputChange(evt, url)});

      // Создать label
      var label = document.createElement('label');
      label.htmlFor = 'product-' + (i+1);
      controls.appendChild(label);

      // Создать li
      var li = document.createElement('li');
      li.classList.add('slider-item');
      li.classList.add('slide');
      li.id = 'slide' + (i+1);
      sliderList.appendChild(li);
    }

    // Отрисовка слайдера
    imgContainer.appendChild(slider);

    addMultipleListeners(slider, 'mousedown touchstart', swipeStart);
    addMultipleListeners(slider, 'mousemove touchmove', swipeMove);
    addMultipleListeners(slider, 'mouseup touchend', function (e){swipeEnd(e, slides)});
  };

  var onInputChange = function (evt, url) {
    var radioOn = document.querySelectorAll('input:checked');
    var slideId = evt.target.id.charAt(8);

    window.data.changeSrcsets(evt, slideId, url);

    // Установка фона из src-set'a
    new ResponsiveBackgroundImage(mainPic);
  };


  window.funcs = {
    renderSlider:renderSlider,
    swipeStart: swipeStart,
    swipeMove: swipeMove,
    swipeEnd: swipeEnd,
    addMultipleListeners: addMultipleListeners
  };
})();
