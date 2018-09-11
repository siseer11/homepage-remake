function init(){
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

	/* SEARCH BAR */
	let searchForm = document.querySelector('.gb-search-form');

	searchForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const value = searchForm.querySelector('.search-input').value.replace(/[^a-z0-9]/g, '')
		if(value){
			window.open(`https://globuzzer.mn.co/search?term=’${value}’`)
		}
	});


	/* Nav Bar */
	const header = document.querySelector('.header');
	const navBar = document.querySelector('.gb-navbar');
	const navBarHeight = navBar.scrollHeight;

	/* Black overlay header */
	const blackHeaderOverlay = document.querySelector('.header-black-overlay');

	//Scroll effect
	const scrolling = (e) => {
		/* Script for the blackHeaderOverlay to change it's opacity */
		const scrollY = window.scrollY;
		const headerHeight = header.scrollHeight;
		if(scrollY < headerHeight){
			blackHeaderOverlay.style.opacity = ((scrollY + 1) /headerHeight )/2
		}
		

		/* Script for the nav to be sticky */

		const isPassed = scrollY >= 10;
		if(isPassed && navBar.classList.contains('gb-background-transparent')){
			navBar.classList.remove('gb-background-transparent');
			navBar.classList.add('gb-background-primary' , 'sticky');
		}else if(!isPassed && navBar.classList.contains('sticky')){
			navBar.classList.remove('gb-background-primary' , 'sticky')
			navBar.classList.add('gb-background-transparent');
		}
	}
	scrolling();
	window.addEventListener('scroll' , debounce(scrolling));

	//Scroll to element when press on link
	const navLinks = navBar.querySelectorAll('a');
	const navAsideLinks = document.querySelectorAll('.nav-aside-content a');
	const navAside = document.querySelector('.gb-nav-aside');
	const pageWrapper = document.querySelector('.gb-page-wrapper');

	//Function that scroll to an element when pressing a link from both nav and navaside
	const scrollToSection = (element) => {
		const scrollToElement = document.getElementById(element.dataset.scrollTo); //get the element to scrollTo
		const elementFromTop = scrollToElement.offsetTop; //get the distance from the top of the specific element
		
		// The cases when the user is clicking from the navaside links
		if(pageWrapper.classList.contains('translated')){
			//close the navAside
			pageWrapper.classList.remove('translated');
			navAside.classList.remove('translated');

			//after the transition of the navAside is done scroll to the element
			pageWrapper.addEventListener('transitionend' , function endingOfTransition(e){
				if(e.propertyName != 'transform') return;
				window.scrollTo({
					top: elementFromTop - navBarHeight + navBarHeight/2,
					behavior: "smooth"
				});

				//remove eventlistener
				pageWrapper.removeEventListener('transitionend', endingOfTransition )
			})
		}else{ //if the click comes from the other links just scroll to the element
			window.scrollTo({
				top: elementFromTop - navBarHeight + navBarHeight/2,  
				behavior: "smooth"
			});
		}
	}
	
	//add the click listener to all the links in the navBar
	navLinks.forEach(el => {
		if(el.dataset.scrollTo){
			el.addEventListener('click' ,(e) => {
				e.preventDefault();
				scrollToSection(el)
			})
		}
	})

	//add the click listener to all the links in the navAside
	navAsideLinks.forEach(el => {
		if(el.dataset.scrollTo){
			el.addEventListener('click' , (e) => {
				e.preventDefault();
				scrollToSection(el)
			}
		)
		}
	})

	//weird no space thing on the right part of the list , fixed here
	const listToBeFixed = document.querySelector('.card-16-list');
	const elementToFixWith = listToBeFixed.querySelector('.list-space-right-fix');

	const listToBeFixedListener = () => {
		const showElementToFixWith = listToBeFixed.clientWidth < listToBeFixed.scrollWidth;
		const shown = elementToFixWith.classList.contains('shown');
		if(showElementToFixWith && !shown){
			console.log('here')
			elementToFixWith.classList.add('shown')
		}else if(!showElementToFixWith && shown){
			console.log('there')
			elementToFixWith.classList.remove('shown')
		}

	}

	listToBeFixedListener();
	window.addEventListener('resize' , debounce(listToBeFixedListener));

}
init();