/* -------------------- GLOBALS -------------------- */
/* ------------------------------------------------ */
var skillsSectionSectionBottomPos;

/* ----------- BROWSER SUPPORT ---------- */
//IE9 transit fallback
if (!$.support.transition) {
   $.fn.transition = $.fn.animate;
}


//check if user's browser is Chrome
var isChrome = !!window.chrome && !!window.chrome.webstore;
var windowWidth;
var vpWidth;
/* -------------------- PLUGINS -------------------- */
/* ------------------------------------------------ */

/* -------------------- AJAX -------------------- */
/* -------------------------------------------------- */

/* -------------------- FUNCTIONS -------------------- */
/* -------------------------------------------------- */
//we need to treat the window width variable differently depending on
//whether the user is using Chrome or not. Chrome interprets the window width
//larger than css does, so without treating them differently, there would be gaps
//in responsive breakpoints. Other browsers wth this issue should be added as noticed.
//Make sure to use the windowWidth variable rather than using $(window).width()
function setWindowWidth() {
	if (isChrome === true) {
		vpWidth = viewport().width;
   		windowWidth = vpWidth;
	} else {
		windowWidth = $(window).width();
	}
}

//get viewport size (do we need this? something they had in previous version)
function viewport() {
   var e = window, a = 'inner';
   if (!('innerWidth' in window )) {
       a = 'client';
       e = document.documentElement || document.body;
   }
   return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

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
function positionProductBoxes() {
	$('.product-section').each(function() {
		var sectionHeight = $(this).height();
		var box = $(this).find('.product-box');
		var margin = (sectionHeight - $(box).height());
		if (windowWidth > 767 && windowWidth < 1200) {
			$(box).css('margin-top', margin / 2);
		} else {
			$(box).attr('style', ' "" ');
		} 
	})
}
function adjustSkillsHeight() {
	if ($('.skill-desc') > 0) {
		var skillsContainerHeight = $(".skills-container").height();
		var sectionContainerMarginBottom = parseInt($("#section-2-container").css('margin-bottom'));
		var section2h2Height = $('#section-2-container h2').outerHeight();
		$("#section-2-container").animate({"height": skillsContainerHeight + sectionContainerMarginBottom + section2h2Height + 70}, {duration: 500});
	}
}
/* --------------------- EVENT LISTENERS ---------------------- */
/* ------------------------------------------------------------ */

// scroll arrow hover
$('body').on('mouseenter', ".scroll-arrow", function() {
	if ($(window).width() > 767) {
    	$(this).stop().transition({'background-color': "whitesmoke"}, {duration: 300});
    	$(this).children().children('.arrow-line').stop().transition({"background-color": "#48280b"})
	}
});
$('body').on('mouseleave', ".scroll-arrow", function() {
	if ($(window).width() > 767) {
		$(this).stop().transition({'background-color': "transparent", "border-radius": "initial"}, {duration: 300});
		$(this).children().children('.arrow-line').stop().transition({"background-color": "whitesmoke"})	
	}
});

//visit project button 
$('body').on('mouseenter', ".project-link-btn ", function() {
	if ($(window).width() > 767) {
		$(this).stop().transition({"border-color": "black", "padding-left": "30px", "padding-right": "30px"}, {duration: 200});
	}
});
$('body').on('mouseleave', ".project-link-btn ", function() {
	if ($(window).width() > 767) {
		$(this).stop().transition({"border-bottom-color": "#b7b7b7", "border-left-color": "transparent", "border-right-color": "transparent", "border-top-color": "transparent", "padding-left": "20px", "padding-right": "20px"}, {duration: 200});
	}
});

$("a").on('click', function(event) {
	debugger
  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {
    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({scrollTop: $(hash).offset().top}, 800, function(){
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  } // End if
});

 //skill box hovers
$('body').on('mouseenter', '.skill-box', function() {
	if (windowWidth > 767) {
		$(this).stop().transition({"background-color": "white", "color": "black"}, {duration: 300});
	}
});
$('body').on('mouseleave', '.skill-box', function() {
	if (windowWidth > 767) {
		$(this).stop().transition({"background-color": "transparent", "color": "white"}, {duration: 300});
	}
});
$('body').on('mouseenter', '.back-btn', function() {
	if (windowWidth > 767) {
		$(this).stop().transition({"background-color": "white", "color": "black", "padding-left": "40px", "padding-right": "40px"}, {duration: 300});
	}
});
$('body').on('mouseleave', '.back-btn', function() {
	if (windowWidth > 767) {
		$(this).stop().transition({"background-color": "transparent", "color": "white", "padding-left": "30px", "padding-right": "30px"}, {duration: 300});
	}
});
$('body').on('mouseenter', '.github-btn', function() {
	if (windowWidth > 767) {
		$(this).stop().transition({"background-color": "black", "padding-left": "30px", "padding-right": "30px"}, {duration: 200});
	}
});
$('body').on('mouseleave', '.github-btn', function() {
	if (windowWidth > 767) {
		$(this).stop().transition({"background-color": "#2a2a2a", "padding-left": "20px", "padding-right": "20px"}, {duration: 200});
	}
});

//skill box clicks
$('body').on('click', '.skill-box', function() {
	var thisSkill = this;
	$(".skills-container").stop().transition({"opacity": "0"}, {duration: 300, complete: function() {
		var skillData = $(thisSkill).attr('data-skill');
		var skillDesc = $('body').find('.skill-desc[data-desc="' + skillData + '"]');
		$(".skill-desc-container").css('display', "block");
		$(skillDesc).css("display", "block").addClass('desc-open');
		$(skillDesc).stop().transition({"opacity": "1"}, {duration: 300});
		$('.back-btn').css('display', 'inline-block');
		$('.back-btn').stop().transition({"opacity": "1"}, {duration: 300});
		var section2Height = $(skillDesc).outerHeight();
		var section2h2Height = $('#section-2-container h2').outerHeight();
		var backHeight = $('.back-btn').outerHeight();
		$("#section-2-container").animate({"height": section2Height + section2h2Height + backHeight + 70}, {duration: 700});
		$(this).css('display', 'none');
	}});
});

//skill box clicks
$('body').on('click', '.back-btn', function() {
	var openDesc = $('body').find('.desc-open');
	$('.back-btn').stop().transition({"opacity": "0"}, {duration: 300});
	$('.back-btn').css('display', 'none');
	$(openDesc).stop().transition({"opacity": "0"}, {duration: 300, complete: function() {
		$(this).css("display", "none");
		$(".skill-desc-container").css('display', "none");
		$(".skills-container").css('display', 'block');
		var skillsContainerHeight = $(".skills-container").height();
		var sectionContainerMarginBottom = parseInt($("#section-2-container").css('margin-bottom'));
		var section2h2Height = $('#section-2-container h2').outerHeight();
		$("#section-2-container").animate({"height": skillsContainerHeight + sectionContainerMarginBottom + section2h2Height + 70}, {duration: 500});
		$(".skills-container").stop().transition({"opacity": "1"}, {duration: 300});
		$(this).removeClass('desc-open');
	}});
});

/* --------------------- DOCUMENT READY ---------------------- */
/* ----------------------------------------------------------- */
$(document).ready(function() {
	setWindowWidth()
	setHeaderWrapperHeight();
  closeLoadingScreen();
  setProductTextPosition();
  positionProductBoxes();

}); // end document ready
$( window ).load(function() {
	

}); // end window load
$(window).scroll(function() {


});// end window scroll
$(window).resize(function() {
	setWindowWidth()
	setHeaderWrapperHeight();
	setProductTextPosition();
	positionProductBoxes();
	adjustSkillsHeight();
}); // end window resize