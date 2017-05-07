/* -------------------- GLOBALS -------------------- */
/* ------------------------------------------------ */


/* ----------- BROWSER SUPPORT ---------- */
//IE9 transit fallback
if (!$.support.transition) {
   $.fn.transition = $.fn.animate;
}


/* -------------------- PLUGINS -------------------- */
/* ------------------------------------------------ */

/* -------------------- AJAX ------------------------ */
/* -------------------------------------------------- */


/* -------------------- FUNCTIONS -------------------- */
/* -------------------------------------------------- */
function closeLoadingScreen() {
	$('.loading-screen').transition({'opacity': '0'}, {duration: 300, complete: function() {
		$(this).css('display', 'none');
	}});
}
function setHeaderWrapperHeight() {
	var windowHeight = $(window).height(); 
	$('.header-wrapper').height(windowHeight)
}
function setProductTextPosition() {
	$('.product-info').each(function() {
		var thisWidth = $(this).width();
		var thisHeight = $(this).height();
		$(this).css({'margin-left': (thisWidth / 2) * -1, 'margin-top': (thisHeight / 2) * -1})
	})
}

/* --------------------- DOCUMENT READY ---------------------- */
/* ----------------------------------------------------------- */
$(document).ready(function() {
	setHeaderWrapperHeight();
    closeLoadingScreen();
    setProductTextPosition();
    $('.product-container').masonry({
	  // options
	  itemSelector: '.product-box',
	  columnWidth: 10,
	  fitWidth: true
	});

    $('body').on('mouseenter', ".product-box", function() {
    	$(this).children('.product-overlay').css('display', 'block');
    	$(this).children('.product-overlay').stop().transition({"opacity": ".6"}, {duration: 300});
    	$(this).children('.product-info').stop().transition({"opacity": "1"}, {duration: 300});
    });
    $('body').on('mouseleave', ".product-box", function() {
    	$(this).children('.product-overlay').stop().transition({"opacity": "0"}, {duration: 300, complete: function() {
    		$(this).css('display', 'none');
    	}});
    	  $(this).children('.product-info').stop().transition({"opacity": "0"}, {duration: 300});
    });

    // scroll arrow hover
    $('body').on('mouseenter', ".scroll-arrow", function() {
    	if ($(window).width() > 767) {
	    	$(this).stop().transition({'background-color': "whitesmoke", "border-radius": "50%"}, {duration: 300});
	    	$(this).children().children('.arrow-line').stop().transition({"background-color": "#48280b"})
    	}
    });
    $('body').on('mouseleave', ".scroll-arrow", function() {
    	if ($(window).width() > 767) {
    		$(this).stop().transition({'background-color': "transparent", "border-radius": "initial"}, {duration: 300});
			$(this).children().children('.arrow-line').stop().transition({"background-color": "whitesmoke"})	
    	}
    });
    $('body').on('mouseenter', "#gh-btn", function() {
    	if ($(window).width() > 767) {
    		$(this).stop().transition({'background-color': "#1a1a1a", "color": "white", "padding-left": '30px', "padding-right": "30px"}, {duration: 300});
    	}
    });
    $('body').on('mouseleave', "#gh-btn", function() {
    	if ($(window).width() > 767) {
    		$(this).stop().transition({'background-color': "transparent", "color": "black", "padding-left": '10px', "padding-right": "10px"}, {duration: 300});
    	}
    });

	$("a").on('click', function(event) {

	    // Make sure this.hash has a value before overriding default behavior
	    if (this.hash !== "") {
	      // Prevent default anchor click behavior
	      event.preventDefault();

	      // Store hash
	      var hash = this.hash;

	      // Using jQuery's animate() method to add smooth page scroll
	      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	      $('html, body').animate({
	        scrollTop: $(hash).offset().top
	      }, 800, function(){
	   
	        // Add hash (#) to URL when done scrolling (default click behavior)
	        window.location.hash = hash;
	      });
	    } // End if
	  });

}); // end document ready
$( window ).load(function() {
	

}); // end window load
$(window).scroll(function() {


});// end window scroll
$(window).resize(function() {
setHeaderWrapperHeight()
}); // end window resize