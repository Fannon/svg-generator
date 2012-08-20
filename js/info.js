/////////////////////////////////
// Javascript for info.html /////
/////////////////////////////////

// This is just for info.html
// The generator doesn't depend on it.

$(document).ready(function() {

	/*
	 * Use Colorbox jQuery Plugin for Image Lightbox
	 * http://jacklmoore.com/colorbox/
	 */
	$('a.colorbox').colorbox({
		rel:'group2',
		transition:"fade",
		opacity: 0.9
	});

	/* Tipsy Plugin for Navigation */
	$('nav a').tipsy({
		gravity: 'ne'
	});

});