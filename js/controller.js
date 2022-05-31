/////////////////////////////////////////////////
// Online SVG Generator - Simon Heimler - 2012 //
/////////////////////////////////////////////////

/**
 * The Controller is a singleton!
 * @type {Object}
 */
var Controller = {};

/**
 * Main Init on document.ready (jQuery)
   This executes not until the site is ready for it
 */
$(document).ready(function() { // DOM Ready
	console.log('DOM Ready: Main Init');
	/* Create a new Paper and Parameter Instance */
	Controller.paper = new Paper();
	Controller.params = new Parameters();

	/* Set Startup Defaults */
	$('#algoselect').val(Controller.params.selectedAlgo);
	Algorithms.prepare[Controller.params.selectedAlgo]();

	/* Start Intro on load */
	Algorithms.draw.intro();

	$('.colorpick').minicolors({
		letterCase: "uppercase"
	});

	$('.tooltip').tooltipster({
		theme: "tooltipster-borderless",
		animation: 'fade',
		animationDuration: 200,
   		delay: 100,
		maxWidth: 360,
		contentAsHTML: true,
	});
});

/**
 * When an algorithm is selected, prepare View / Data
 */
Controller.selectAlgo = function() {

	Controller.params.selectedAlgo = $('#algoselect').val();

	// Reset the Parameters:
	Controller.params.reset();

	// Executing the selectet Algorithm via Array Notation
	Algorithms.prepare[Controller.params.selectedAlgo]();

};

/**
 * Generate the Graphic
 */
Controller.generate = function() {

	/* Get the current Parameters */
	Controller.params.get();

	/* Validates the Parameters */
	var validates = Controller.params.validate();

	/* Get Size of Paper */
	Controller.paper.getSize();

	// Just run the Algorithm if every Parameter validated.
	if (validates) {

		// Start Benchmark (ms)
		var renderTime, start = new Date();

		// Check for Overlay Mode
		if (Controller.paper.overlaymode === false) {

			Controller.paper.prepare();

		} else {

			// If true: Skip Paper.init and set Variable back to false.
			Controller.paper.overlaymode = false;
		}

		try {

			// Choose Algorithm to render via Array Notation
			Algorithms.draw[Controller.params.selectedAlgo]();

		} catch (e) {

			alert('An Error occured while executing the Algorithm.\n' + e);
			console.log(e);

		}

		// Write Benchmark to Site
		renderTime = new Date() - start;
		$('#benchmark').html('SVG generated in ' + renderTime + ' ms.').fadeIn(Controller.params.fadeTime);

	} else {

		// Do nothing. User needs to fix Paramters first.
	}

};

/**
 * Use the Overlay Mode
 */
Controller.overlay = function() {
	Controller.paper.overlaymode = true;
	Controller.generate();
};

/**
 * Randomize Parameter Values
 */
Controller.randomize = function() {
	Controller.params.randomize();
	Controller.generate();
};

Controller.downloadText = function (filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    
    element.style.display = 'none';
    document.body.appendChild(element);
    
    element.click();
    
    document.body.removeChild(element);
}

/**
 * Export current SVG to a File directly through browser APIs
 */
Controller.exportSVG = function() {
	var now = new Date();

	// TODO: No leading zeros right now
	var filename = 'SVG-Export-' + now.getFullYear() + '-' + (1 + now.getMonth()) + '-' + (1 + now.getDay()) + '-' + (1 + now.getHours()) + '-' + (1 + now.getSeconds()) + '.svg';

	Controller.downloadText(filename, $('#paper').html());

	console.log("File " + filename + ".svg exported.");
};


//////////////////////////////////////////
// Extending the Math Class //////////////
//////////////////////////////////////////

/**
 * Randomizer which returns floored numbers between min and max
 *
 * Extends Math Class with randomizing Function
 * @param  {number} minsize Minimal number
 * @param  {number} maxsize Maximum number
 * @return {number} Calculated random number (floored)
 */
Math.rnd = function(minsize, maxsize) {
	// Have to floor the floats, otherwise it gives strange Results:
	var min = Math.floor(minsize);
	var max = Math.floor(maxsize);
	return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Generates a random hexadecimal Color Code for HTML
 *
 * @return {String} Hexadecimal Color Code
 */
Math.rndHex = function() {
	// http://paulirish.com/2009/random-hex-color-code-snippets/
	return '#' + Math.floor(Math.random() * 16777215).toString(16).toUpperCase();
};
