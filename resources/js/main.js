var cssChangeTarget, cssChangeTextTarget ,watchedElems ,watchedNav ,cssChangeNav;


// Set things up.
window.addEventListener("load", function (event) {

  cssChangeTarget = document.querySelector('body');
  cssChangeTarget.style.willChange = 'background';
  cssChangeNav = document.getElementById('nav');

  cssChangeTextTarget = document.querySelectorAll('.text-color-me');
  // cssChangeTextTarget.style.willChange = 'color';

  watchedElems = document.querySelectorAll('.color-me');
  watchedNav = document.querySelector('#hiddenSection');

  createObserver();
}, false);

function createObserver() {
  var observer;

  var options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0
  };

  var observerNav;

  var optionsNav = {
    root: null,
    rootMargin: "0px",
    threshold: 0.8
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observerNav = new IntersectionObserver(handleIntersectNav, optionsNav);
  
  watchedElems.forEach(elem => {
    observer.observe(elem);
  });

  observerNav.observe(watchedNav);
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


function handleIntersectNav(entries, observerNav){
  let observedNav = entries[0];
  if( observedNav.isIntersecting ){ 
  cssChangeNav.style.backgroundColor = 'transparent';
  }else{
  cssChangeNav.style.backgroundColor = 'white';
  };
}

