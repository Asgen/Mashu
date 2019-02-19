(function () {
  var showDescription = function (e) { 
    var description = document.querySelector('.description');
    var heading = description.querySelector('h3');
    var parag = description.querySelector('p');
    var more = description.querySelector('#more');
    var readMoreButton = description.querySelector('#read-more');
    var dots = description.querySelector('#dots');

    // Description
    var headingText = e.target.parentElement.querySelector('h3');
    var paragText = e.target.parentElement.querySelector('p');
    var moreText = e.target.parentElement.querySelector('.tabs__more');
    headingText = headingText.textContent;
    paragText = paragText.textContent;
    heading.textContent = headingText;
    parag.textContent = paragText;

    dots.style.display = "inline";
    readMoreButton.innerHTML = "Read more"; 
    more.style.display = "none";

    if (moreText) {
      dots.style.display = 'inline';
      readMoreButton.style.display = 'block';
      moreText = moreText.textContent;
      more.textContent = moreText;
    } else {
      dots.style.display = 'none';
      readMoreButton.style.display = 'none';
    }

    var onReadMoreClick = function () {
      more.style.display = 'inline';
      if (dots.style.display === "none") {
        dots.style.display = "inline";
        readMoreButton.innerHTML = "Read more"; 
        more.style.display = "none";
      } else {
        dots.style.display = "none";
        readMoreButton.innerHTML = "Read less"; 
        more.style.display = "inline";
      }
      readMoreButton.removeEventListener('click', onReadMoreClick);
    };

    if (readMoreButton) {
      readMoreButton.addEventListener('click', onReadMoreClick);
    }
  };


  window.showDescription = showDescription;
})();