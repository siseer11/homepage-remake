const navAsideTrigger = () => {
  let windowHeight = document.documentElement.clientHeight;
  const body = document.querySelector('body');
  const menuBurger = document.querySelector('.nav-burger');
  const pageWrapper = document.querySelector('.gb-page-wrapper');
  const navAside = document.querySelector('.gb-nav-aside')
  const blackOverlay = document.querySelector('.gb-page-black-overlay');
  const navAsideCloseBtn = document.querySelector('.nav-aside-close');

  /* Debouncer */
	const debounce = (func, wait = 10, immediate = false) => {
		let timeout;
		return function () {
			let context = this, args = arguments;
			let later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args)
			};
			let callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		}
	}


  //set the height of the body and navAside to the window height, weird bug on mobile with 100vh
  const setHeightToWindowHeight = () => {
    windowHeight = document.documentElement.clientHeight;
    navAside.style.height = windowHeight + 'px';
    body.style.height = windowHeight + 'px';
    body.style.overflowY = 'hidden';
  }

  const setHeightToWindowHeightDebounced = debounce(setHeightToWindowHeight);

  //open the sidemenu
  menuBurger.addEventListener('click' , (e) => {  
    e.preventDefault();
    //stop the user ability to scroll on y
    body.style.overflowY = 'hidden';

    //show the sidemenu, by adding translated class
    pageWrapper.classList.add('translated');
    navAside.classList.add('translated');
  })


  //close the sidemenu
  const removeTranslated = () =>{     
    //give the user ability to scroll on y
    body.style.overflowY = 'unset';

    //hide the sidemenu, by removing translated class
    pageWrapper.classList.remove('translated');
    navAside.classList.remove('translated');
  }

  blackOverlay.addEventListener('click' ,removeTranslated);
  navAsideCloseBtn.addEventListener('click' ,removeTranslated);
}

navAsideTrigger();