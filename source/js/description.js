(function () {
  var description = document.querySelector('.description');
  var more = description.querySelector('#more');
  var readMoreButton = description.querySelector('#read-more');
  var dots = description.querySelector('#dots');

  var onReadMoreClick = function () {
    more.style.display = 'inline';
    if (dots.style.display === "none") {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      description.style.maxHeight = "14vh";
      description.style.minHeight = "14vh";
      more.style.opacity = "0";
      readMoreButton.style.opacity = "0";
      setTimeout(function() {
        more.style.display = "none";
        readMoreButton.style.opacity = "1";
      }, 300);
      dots.style.display = "block";
      readMoreButton.innerHTML = "Читать еще";
    } else {
      description.style.maxHeight = "1000px";
      description.style.minHeight = "100px";
      dots.style.display = "none";
      readMoreButton.innerHTML = "Свернуть";
      more.style.display = "inline";
      more.style.opacity = "1";
      //fadeIn(more);
    }
  };

  var showDescription = function (e) {
    var heading = description.querySelector('h3');
    var parag = description.querySelector('p');

    // Description
    description.style.minHeight = "14vh";
    var headingText = e.target.parentElement.querySelector('h3');
    var paragText = e.target.parentElement.querySelector('p');
    var moreText = e.target.parentElement.querySelector('.tabs__more');
    headingText = headingText.textContent;
    paragText = paragText.textContent;
    heading.textContent = headingText;
    parag.textContent = paragText;

    dots.style.display = "block";
    readMoreButton.innerHTML = "Читать еще";
    more.style.display = "none";

    if (moreText) {
      dots.style.display = 'block';
      readMoreButton.style.display = 'block';
      moreText = moreText.textContent;
      more.textContent = moreText;
    } else {
      dots.style.display = 'none';
      readMoreButton.style.display = 'none';
    }



    if (readMoreButton) {
      readMoreButton.addEventListener('click', onReadMoreClick);
    }
  };


  window.showDescription = showDescription;
})();
