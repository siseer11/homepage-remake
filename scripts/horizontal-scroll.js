var scroller = {};
scroller.e = document.getElementById(".gb-card-six-wrapper");

if (scroller.e.addEventListener) {
    scroller.e.addEventListener("mousewheel", MouseWheelHandler, false);
    scroller.e.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
} else scroller.e.attachEvent("onmousewheel", MouseWheelHandler);

function MouseWheelHandler(e) {

    // cross-browser wheel delta
    var e = window.event || e;
    var delta = - 20 * (Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))));

    var pst = $('.gb-card-six-wrapper').scrollLeft() + delta;

    if (pst < 0) {
        pst = 0;
    } else if (pst > $('.gb-card-six').width()) {
        pst = $('.gb-card-six').width();
    }

    $('.gb-card-six-wrapper').scrollLeft(pst);

    return false;
	
	}