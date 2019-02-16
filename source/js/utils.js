(function () {
  var renderSlider = function (slides, url) {

    // Получение из шаблона
    var sliderTemplate = document.querySelector('#slider')
    .content
    .querySelector('.slider-container');

    var slider = sliderTemplate.cloneNode(true);
    var wrapper = slider.querySelector('.wrapper');
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
      slider.insertBefore(input, wrapper);
      // Задает фоновую картинку на основе аргумента и id инпута
      input.addEventListener('change', function (evt) {
        var radioOn = document.querySelectorAll('input:checked');
        var slideId = evt.target.id.charAt(8);
        var src = url + slideId + '-full.jpg';
        wrapper.style.backgroundImage = 'url(' + src + ')';;
      });

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
    // Выбор первого при отрисовке
    wrapper.style.backgroundImage = 'url(' + url + '1-full.jpg' + ')';
  };


  window.funcs = {
    renderSlider:renderSlider
  };
})();
