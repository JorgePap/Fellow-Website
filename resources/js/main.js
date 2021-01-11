var cssChangeTarget, cssChangeTextTarget,watchedElems;


// Set things up.
window.addEventListener("load", function (event) {

  cssChangeTarget = document.querySelector('body');
  cssChangeTarget.style.willChange = 'background';

  cssChangeTextTarget = document.querySelectorAll('.text-color-me');
  // cssChangeTextTarget.style.willChange = 'color';

  watchedElems = document.querySelectorAll('.color-me');

  createObserver();
}, false);

function createObserver() {
  var observer;

  var options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0
  };

  observer = new IntersectionObserver(handleIntersect, options);

  watchedElems.forEach(elem => {
    observer.observe(elem);
  });
}

function handleIntersect(entries, observer) {
  entries.forEach(function (entry) {
    cssChangeTarget.style.backgroundColor = entry.target.dataset.color;;

    var newValue2 = entry.target.dataset.textColor;

    cssChangeTextTarget.forEach(function (el) {
      el.style.color = newValue2;
    });
  });
}