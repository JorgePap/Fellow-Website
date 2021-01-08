var cssChangeTarget,
    cssChangeTextTarget,
    watchedElems,
    config = {
        selector: '.color-me',
        dataAttr: 'color',
        textSelector: 'text-color-me',
        dataTextColor: 'text-color',
        targetElem: 'body',
		cssProp: 'backgroundColor', 
        threshold: 1.0, 		
        willChangeProp: 'background'
         
    };

// Set things up.
window.addEventListener("load", function(event) {
    cssChangeTextTarget = document.querySelectorAll(config.textSelector);
	cssChangeTextTarget.style.willChange = 'color';
    cssChangeTarget = document.querySelector(config.targetElem);
	cssChangeTarget.style.willChange = config.willChangeProp;
    watchedElems = document.querySelectorAll(config.selector);
    createObserver();
  }, false);

function createObserver() {
  var observer;

  var options = {
    root: null,
    rootMargin: "0px",
    threshold: config.threshold
  };

  observer = new IntersectionObserver(handleIntersect, options);
  
  watchedElems.forEach(elem => {
    observer.observe(elem);
  });
}

function handleIntersect(entries, observer) {
  entries.forEach(function(entry) {
    var newValue = entry.target.dataset[config.dataAttr];
    cssChangeTarget.style[config.cssProp] = newValue;
    var newValue2 = entry.target.dataset[config.dataTextColor];
    cssChangeTextTarget.forEach(function(el){
        el.style[config.cssProp] = newValue2;});
  });
}