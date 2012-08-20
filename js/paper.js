/////////////////////////
// Paper  MODEL (DATA) //
/////////////////////////

/**
 * Creates Instance of the SVG Paper for Raphel.js
 * @constructor
 * @this {Paper}
 */
function Paper() {

	// Save jQuery References for Speed Improvements
	this.paperRef = $('#paper');
	this.benchmarkRef = $('#benchmark');

	// Attributes //
	this.X = this.paperRef.width();
	this.Y = this.paperRef.height();
	this.overlaymode = false;
}

// Methods //

/**
 * Prepares the Paper for drawing the Graphics
 */
Paper.prototype.prepare = function() {

	console.log('Preparing Paper');

	/** Clear Paper and Benchmark */
	this.clear();

	/** Create new Paper via RaphaelJS */
	this.svg = new Raphael('paper', this.X, this.Y);

	/** Set Background-Color via Rectangle if Color is not 'none': */
	if (Controller.params.bgcolor != 'none') {
		var bg = this.svg.rect(0, 0, this.X, this.Y);
		bg.attr({
			fill: Controller.params.bgcolor,
			stroke: 'none'
		});
	}
};

/**
 * Get the Size of the Paper
 * Just in case that the Paper size might have changed since startup.
 */
Paper.prototype.getSize = function() {
	// Paper Parameters
	this.X = this.paperRef.width();
	this.Y = this.paperRef.height();
};

/**
 * Clears the Paper and the Benchmark
 */
Paper.prototype.clear = function() {
	this.paperRef.html('');
	this.benchmarkRef.hide();
};