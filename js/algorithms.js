//////////////////////////////////////////
// Algorithm Class - MODEL & View ////////
//////////////////////////////////////////

/**
 * In this Singleton Object are 3 further Objects which contain the Title, Preparation and Drawing Logic.
   It should be easy to extend this file with more algorithms, just adding them at the bottom of the file.
   Everything else will be auto generated then by traversing those objects.
 *
 * @type {Object}
 */
var Algorithms = {

	/**
	 * Title of a specific Algorithm (human-readable)
	 * This will auto generate the Dropdown Option Box!
	 */
	title: {},

	/**
	 * Prepare the generator for a specific Algorithm
	 */
	prepare: {},

	/**
	 * Calculate and draw a specific Algorithm
	 */
	draw: {}

};

//////////////////////////////////////////
// Intro Animation ///////////////////////
//////////////////////////////////////////

/**
 * Draws the Intro Animation when the site is visited.
 * Inspirated from: http://raphaeljs.com/playground.html
 */
Algorithms.draw.intro = function() {

	Controller.paper.getSize();
	Controller.paper.prepare(); // Prepare Paper
	Controller.params.bgcolor = '#FFF';

	/** Animated Circle */
	var c1 = Controller.paper.svg.circle(Controller.paper.X / 2, Controller.paper.Y / 2, Math.rnd(150, Controller.paper.Y / 2 - 50)).attr({
		fill: "#000",
		stroke: "#777",
		opacity: 0.2,
		"stroke-width": 0
	});

	/** Draw Text */
	var text = Controller.paper.svg.text(Controller.paper.X / 2, Controller.paper.Y / 2, "Press Generate!").attr({
		fill: "#FFF",
		stroke: "none",
		'font-size': 24,
		opacity: 1
	});

	/** Animate the circle (loops) */
	function aniCircle1() {
		c1.animate({
			stroke: "#AAA",
			"stroke-width": Math.rnd(10, 80),
			"stroke-opacity": 0.5
		}, Math.rnd(2000, 3000), function() {
			aniCircle1();
		});
	}

	aniCircle1();

};

//////////////////////////////////////////
// Rotated Ellipses Algorithm ////////////
//////////////////////////////////////////

/** Assigns Human Readable Title to unique Algorithm Name (ID) */
Algorithms.title.rotatedEll = "Rotated Ellipses";

/** Executes when this algorithm is selected. Prepares everything for drawing */
Algorithms.prepare.rotatedEll = function() {

	// Disable unused parameters
	Controller.params.hide(['textbox']);

	// Add custom Parameters
	Controller.params.add('aspectratio', 'Aspect Ratio:', 'Aspect Ratio of the Ellipse. Y is X multiplied by [factor].', 1.41);

	// Set default values:
	Controller.params.set({
		bgcolor: '#F5F5F5',
		count: 32,
		stroke: '#555',
		strokeW: 1,
		fill: 'none',
		opacity: 50,
		minsize: 120,
		maxsize: 130,
		paddingV: 240,
		paddingH: 320
	});

};

/** Actual calculation and drawing */
Algorithms.draw.rotatedEll = function() {

	var posX, posY, sizeX, sizeY;
	var angle = 0;
	var angleadd = 360 / Controller.params.count;

	// Start drawing:
	for (var i = 0; i < Controller.params.count; i += 1) {

		// Calculations
		posX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
		posY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);
		sizeX = Math.rnd(Controller.params.minsize, Controller.params.maxsize);
		sizeY = sizeX * Controller.params.aspectratio;

		// Drawing
		Controller.paper.svg.ellipse(posX, posY, sizeX, sizeY).transform('r' + angle).attr({
			fill: Controller.params.fill,
			stroke: Controller.params.stroke,
			'stroke-width': Controller.params.strokeW,
			opacity: Controller.params.opacity / 100
		});

		angle += angleadd;
	}
};

//////////////////////////////////////////
// Circles 01 Algorithm //////////////////
//////////////////////////////////////////

Algorithms.title.circles01 = "Random Circles";

Algorithms.prepare.circles01 = function() {

	// Disable unused parameters
	Controller.params.hide(['textbox']);

	// Set default values:
	Controller.params.set({
		bgcolor: '#F0F0F0',
		count: 32,
		stroke: '#CCC',
		strokeW: 1,
		fill: '#000',
		opacity: 20,
		minsize: 30,
		maxsize: 125,
		paddingV: 120,
		paddingH: 110
	});

};

Algorithms.draw.circles01 = function() {

	var posX, posY, size;

	// Start drawing:
	for (var i = 0; i < Controller.params.count; i += 1) {

		// Calculations
		posX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
		posY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);
		size = Math.rnd(Controller.params.minsize, Controller.params.maxsize);

		// Drawing
		Controller.paper.svg.circle(posX, posY, size).attr({
			fill: Controller.params.fill,
			stroke: Controller.params.stroke,
			'stroke-width': Controller.params.strokeW,
			opacity: Controller.params.opacity / 100
		});

	}
};


//////////////////////////////////////////
// Rectangle 01 Algorithm ////////////////
//////////////////////////////////////////

Algorithms.title.rectangles01 = "Random Rectangles";

Algorithms.prepare.rectangles01 = function() {

	// Disable unused parameters
	Controller.params.hide(['minsize', 'maxsize', 'textbox']);

	// Add custom Parameters
	Controller.params.add('minSizeW', 'Min Size Width:', 'Minimum horizontal Size of Rectangles', 20);
	Controller.params.add('minSizeH', 'Min Size Height:', 'Minimum vertical Size of Rectangles', 20);
	Controller.params.add('maxSizeW', 'Max Size Width:', 'Maximum horizontal Size of Rectangles', 300);
	Controller.params.add('maxSizeH', 'Max Size Height:', 'Maximum vertical Size of Rectangles', 300);
	Controller.params.add('roundedB', 'Rounded Borders:', 'Size of rounded Borders ', 5);

	// Set Default Variables: (Object literal)
	Controller.params.set({
		bgcolor: '#242424',
		count: 32,
		stroke: 'none',
		strokeW: 0,
		fill: '#FFF',
		opacity: 20,
		minsize: 150,
		paddingV: 120,
		paddingH: 120
	});

};

Algorithms.draw.rectangles01 = function() {

	var posX, posY, width, height, size, tpath, draw;

	// Start drawing:
	for (var i = 0; i < Controller.params.count; i += 1) {

		// Calculations
		posX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
		posY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);
		width = 1 * Controller.params.minSizeW + Math.rnd(0, Controller.params.maxSizeW);
		height = 1 * Controller.params.minSizeH + Math.rnd(0, Controller.params.maxSizeH);
		tpath = "t-" + width / 2 + ",-" + height / 2;

		// Drawing
		draw = Controller.paper.svg.rect(posX, posY, width, height, Controller.params.roundedB).transform(tpath).attr({
			fill: Controller.params.fill,
			stroke: Controller.params.stroke,
			'stroke-width': Controller.params.strokeW,
			opacity: Controller.params.opacity / 100
		});

	}
};

//////////////////////////////////////////
// Straight Lines Algorithm //////////////
//////////////////////////////////////////

Algorithms.title.straightLines = "Straight Lines";

Algorithms.prepare.straightLines = function() {

	// Disable unused parameters
	Controller.params.hide(['minsize', 'maxsize', 'textbox']);

	// Set Default Variables:
	Controller.params.set({
		count: 300,
		bgcolor: '#FFF',
		Parameters: 500,
		stroke: '#000',
		strokeW: 1,
		fill: 'none',
		opacity: 100,
		paddingV: 5,
		paddingH: 5
	});

};

Algorithms.draw.straightLines = function() {

	var firstPosX, firstPosY, posX, posY, path;

	// Start Path
	firstPosX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
	firstPosY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);
	path = "M " + firstPosX + " " + firstPosY + " ";

	for (var i = 0; i < Controller.params.count; i += 1) {

		// Calculations
		posX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
		posY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);

		// Add Pathpoints
		path += "L " + posX + " " + posY + " ";
	}
	
	// End Path
	path += " z";

	// Draw Path
	Controller.paper.svg.path(path).attr({
		fill: Controller.params.fill,
		stroke: Controller.params.stroke,
		'stroke-width': Controller.params.strokeW,
		opacity: Controller.params.opacity / 100
	});
};

//////////////////////////////////////////
// Curved Lines Algorithm ////////////////
//////////////////////////////////////////

Algorithms.title.curvedLines = "Curved Lines";

Algorithms.prepare.curvedLines = function() {

	// Disable unused parameters
	Controller.params.hide(['fill', 'strokeW', 'textbox']);

	Controller.params.add('nodes', '# of Nodes:', 'Number of Nodepoints. Set to 0 for none.', 1);

	// Set Default Variables:
	Controller.params.set({
		bgcolor: '#141414',
		count: 300,
		stroke: '#EEE',
		opacity: 40,
		minsize: 1,
		maxsize: 1,
		paddingV: -50,
		paddingH: -50
	});
};

Algorithms.draw.curvedLines = function() {

	var startX, startY, posX, posY, toX, toY, path;

	if (Controller.params.nodes < 1) {
		// No Nodes Modus
		for (var i = 0; i < Controller.params.count; i += 1) {

			startX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
			startY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);

			posX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
			posY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);
			toX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
			toY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);

			path = "M " + startX + " " + startY + "S" + posX + " " + posY + " " + toX + " " + toY + " ";

			Controller.paper.svg.path(path).attr({
				fill: Controller.params.fill,
				stroke: Controller.params.stroke,
				'stroke-width': Math.rnd(Controller.params.minsize, Controller.params.maxsize),
				opacity: Controller.params.opacity / 100
			});
		}

	} else {

		for (var j = 0; j < Controller.params.nodes; j += 1) {

			startX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
			startY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);

			for (var i = 0; i < Controller.params.count / Controller.params.nodes; i += 1) {

				posX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
				posY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);
				toX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
				toY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);

				path = "M " + startX + " " + startY + "S" + posX + " " + posY + " " + toX + " " + toY + " ";

				Controller.paper.svg.path(path).attr({
					fill: Controller.params.fill,
					stroke: Controller.params.stroke,
					'stroke-width': Math.rnd(Controller.params.minsize, Controller.params.maxsize),
					opacity: Controller.params.opacity / 100
				});

			}
		}
	}
};

//////////////////////////////////////////
// Bezier Lines Algorithm ////////////////
//////////////////////////////////////////

Algorithms.title.bezierLines = "Bezier Lines";

Algorithms.prepare.bezierLines = function() {

	// Disable unused parameters
	Controller.params.hide(['strokeW', 'textbox']);

	// Add Parameters
	Controller.params.add('beziers', '# of Beziers:', 'Number of Beziers-Sets to be drawn', 2);

	// Set Default Variables:
	Controller.params.set({
		bgcolor: '#000',
		count: 200,
		stroke: '#EEE',
		fill: 'none',
		opacity: 30,
		minsize: 1,
		maxsize: 3,
		paddingV: -220,
		paddingH: -220
	});
};

Algorithms.draw.bezierLines = function() {

	var startX, startY, posX, posY, toX, toY, path;

	for (var i = 0; i < Controller.params.beziers; i += 1) {

		startX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
		startY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);

		toX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
		toY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);

		for (var j = 0; j < Controller.params.count; j += 1) {

			posX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
			posY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);

			path = "M " + startX + " " + startY + "Q" + posX + " " + posY + " " + toX + " " + toY + " ";

			Controller.paper.svg.path(path).attr({
				fill: Controller.params.fill,
				stroke: Controller.params.stroke,
				'stroke-width': Math.rnd(Controller.params.minsize, Controller.params.maxsize),
				opacity: Controller.params.opacity / 100
			});

		}
	}
};

//////////////////////////////////////////
// Sunbeam Lines Algorithm ///////////////
//////////////////////////////////////////

Algorithms.title.sunbeamLines = "Sunbeam Lines";

Algorithms.prepare.sunbeamLines = function() {

	// Disable unused parameters
	Controller.params.hide(['fill', 'strokeW', 'textbox']);

	// Set Default Variables:
	Controller.params.set({
		bgcolor: '#333',
		count: 200,
		stroke: '#FFF',
		opacity: 50,
		minsize: 1,
		maxsize: 12,
		paddingV: -50,
		paddingH: -50,
		p1: 70
	});
};

Algorithms.draw.sunbeamLines = function() {

	var startX, startY, posX, posY, path;

	startX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
	startY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);

	for (var i = 0; i < Controller.params.count; i += 1) {

		// Calculations
		posX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
		posY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);

		path = "M " + startX + " " + startY + "L " + posX + " " + posY + " ";

		Controller.paper.svg.path(path).attr({
			fill: Controller.params.fill,
			stroke: Controller.params.stroke,
			'stroke-width': Math.rnd(Controller.params.minsize, Controller.params.maxsize),
			opacity: Controller.params.opacity / 100
		});

	}
};

//////////////////////////////////////////
// Parallel Lines Algorithm //////////////
//////////////////////////////////////////

Algorithms.title.parallelLines = "Parallel Lines";

Algorithms.prepare.parallelLines = function() {

	// Disable unused parameters
	Controller.params.hide(['count', 'strokeW', 'paddingV', 'paddingH', 'fill', 'textbox']);

	// Add custom Parameters
	Controller.params.add('rPadding', 'Random Padding:', 'Amound of random Padding between Lines', 20);

	// Set Default Variables:
	Controller.params.set({
		count: 1,
		// Just for validation
		bgcolor: '#111',
		stroke: '#999',
		opacity: 20,
		minsize: 1,
		maxsize: 15
	});

};

Algorithms.draw.parallelLines = function() {

	var posX, posY, path;

	// Start Path
	posX = 0;
	posY = 0;

	while (true) {
		path = "M " + posX + " " + posY + " " + "L " + posX + " " + Controller.paper.Y;

		Controller.paper.svg.path(path).attr({
			stroke: Controller.params.stroke,
			'stroke-width': (Math.rnd(Controller.params.minsize, Controller.params.maxsize)),
			opacity: Controller.params.opacity / 100
		});


		posX = posX + Math.rnd(0, Controller.params.rPadding);

		if (posX > Controller.paper.X) {
			break;
		}
	}
};

//////////////////////////////////////////
// Text Chars Algorithm //////////////////
//////////////////////////////////////////

Algorithms.title.textChars = "Text (Chars)";

Algorithms.prepare.textChars = function() {

	// Disable unused parameters
	Controller.params.hide(['stroke', 'strokeW']);

	// Add custom Parameters
	Controller.params.add('rotationMin', 'Rotation (min)', 'Random rotation minimum degree', 180);
	Controller.params.add('rotationMax', 'Rotation (max)', 'Random rotation maximum degree', 180);
	Controller.params.add('chars', '# of Chars:', 'Number of Chars bundled together', 1);
	Controller.params.add('fontfamily', 'Font-Family:', 'Which Font to use', 'Arial');

	// Set Default Variables:
	Controller.params.set({
		bgcolor: '#F0F0F0',
		count: 30,
		fill: '#000',
		opacity: 30,
		minsize: 10,
		maxsize: 300,
		paddingV: 120,
		paddingH: 120,
		textbox: '{}'
	});
};

Algorithms.draw.textChars = function() {

	var posX, posY, fontsize, text;

	for (var i = 0; i < Controller.params.count; i += 1) {

		// Calculations
		posX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
		posY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);

		fontsize = Math.rnd(Controller.params.minsize, Controller.params.maxsize);
		text = '';

		const stringArray = splitUnicodeString(Controller.params.textbox)
		
		for (var j = 0; j < Controller.params.chars; j += 1) {
			var selectedChar = stringArray[Math.floor(Math.random()*stringArray.length)];
			text = text + selectedChar;
		}

		// Draw Text
		Controller.paper.svg.text(posX, posY, selectedChar).attr({
			'fill': Controller.params.fill,
			'stroke': Controller.params.stroke,
			'opacity': (Controller.params.opacity / 100),
			'font-size': fontsize,
			'font-family': Controller.params.fontfamily
		});

	}
};

//////////////////////////////////////////
// Text Words Algorithm //////////////////
//////////////////////////////////////////

Algorithms.title.textWords = "Text (Words)";

Algorithms.prepare.textWords = function() {

	// Disable unused parameters
	Controller.params.hide(['stroke', 'strokeW']);

	// Add custom Parameters
	Controller.params.add('fontfamily', 'Font-Family:', 'Which Font to use', 'Garamond');

	// Set Default Variables:
	Controller.params.set({
		bgcolor: '#E8E8E8',
		count: 30,
		fill: '#242424',
		opacity: 40,
		minsize: 12,
		maxsize: 150,
		paddingV: 70,
		paddingH: 150,
		textbox: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
	});
};

Algorithms.draw.textWords = function() {

	var posX, posY, fontsize, k, draw;
	var words = Controller.params.textbox.split(' ');

	for (var i = 0; i < Controller.params.count; i += 1) { // TODO: Läuft nur einmal durch?
		// Calculations
		posX = Math.rnd(Controller.params.paddingH, Controller.paper.X - Controller.params.paddingH);
		posY = Math.rnd(Controller.params.paddingV, Controller.paper.Y - Controller.params.paddingV);
		fontsize = Math.rnd(Controller.params.minsize, Controller.params.maxsize);

		k = Math.rnd(0, (words.length - 1));

		// Draw Text
		draw = Controller.paper.svg.text(posX, posY, words[k]).attr({
			fill: Controller.params.fill,
			stroke: Controller.params.stroke,
			"opacity": (Controller.params.opacity / 100),
			'font-size': fontsize,
			'font-family': Controller.params.fontfamily
		});
	}
};

//////////////////////////////////////////
// Sandbox ///////////////////////////////
//////////////////////////////////////////

// Algorithms.title.experiment = "Experiment...";

Algorithms.prepare.experiment = function() {

	// Disable unused parameters
	Controller.params.hide(['textbox']);

	// Add custom Parameters
	// Controller.params.add('fontfamily', 'Font-Family:', 'Which Font to use', 'Garamond');
	// Set Default Variables:
	Controller.params.set({
		bgcolor: '#E8E8E8',
		count: 30,
		stroke: "#000",
		strokeW: 1,
		fill: 'none',
		opacity: 100,
		minsize: 12,
		maxsize: 150,
		paddingV: 70,
		paddingH: 150,
		textbox: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
	});
};

Algorithms.draw.experiment = function() {
	// Inspired from: http://www.toves.org/books/java/ch18-recurex/index.html
	// NOT WORKING - JUST A SANDBOX
	var posX, posY, x1, y1, x2, y2, x3, y3, len, angle, draw, path;

	function drawTree(posX, posY, len, angle) {

		if (len > 7) {
			// newX = posX + len * Math.cos(angle * Math.PI / 180)
			// newY = posY + len * Math.sin(angle * Math.PI / 180)
			x1 = posX + len * Math.cos(angle);
			y1 = posY + len * Math.sin(angle);
			x2 = posX + len * Math.cos(angle + 90);
			y2 = posY + len * Math.sin(angle + 90);
			x3 = posX + len * Math.cos(angle + 180);
			y3 = posY + len * Math.sin(angle + 180);

			path = "M " + posX + " " + posY + "L" + x1 + " " + y1 + "";
			path += "M " + posX + " " + posY + "L" + x2 + " " + y3 + "";
			path += "M " + posX + " " + posY + "L" + x3 + " " + y3 + "";

			draw = Controller.paper.svg.path(path);

			// Change Style
			draw.attr({
				fill: Controller.params.fill,
				stroke: Controller.params.stroke,
				'stroke-width': Controller.params.strokeW,
				opacity: Controller.params.opacity / 100
			});

			drawTree(x1, y1, len * 0.75, angle + 10);
			drawTree(x2, y2, len * 0.66, angle - 20);
			drawTree(x3, y3, len * 0.75, angle + 10);

		}

	}

	drawTree(320, 240, 70, 90);

};

//////////////////////////////////////////
// Sandbox ///////////////////////////////
//////////////////////////////////////////

Algorithms.title.baum = "Tree Render";

Algorithms.prepare.baum = function() {

	// Disable unused parameters
	Controller.params.hide(['textbox']);

	// Add custom Parameters
	// Controller.params.add('fontfamily', 'Font-Family:', 'Which Font to use', 'Garamond');
	// Set Default Variables:
	Controller.params.set({
		bgcolor: '#E8E8E8',
		count: 30,
		stroke: "#000",
		strokeW: 1,
		fill: 'none',
		opacity: 100,
		minsize: 12,
		maxsize: 150,
		paddingV: 70,
		paddingH: 150,
		textbox: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
	});

	
};

Algorithms.draw.baum = function() {
	// Inspired from: http://www.toves.org/books/java/ch18-recurex/index.html
	// NOT WORKING - JUST A SANDBOX
	var posX, posY, x1, y1, x2, y2, x3, y3, len, angle, draw, path;

	function drawTree(posX, posY, len, angle) {

		if (len > 7) {
			// newX = posX + len * Math.cos(angle * Math.PI / 180)
			// newY = posY + len * Math.sin(angle * Math.PI / 180)
			x1 = posX + len * Math.cos(angle);
			y1 = posY + len * Math.sin(angle);
			x2 = posX + len * Math.cos(angle + 90);
			y2 = posY + len * Math.sin(angle + 90);
			x3 = posX + len * Math.cos(angle + 180);
			y3 = posY + len * Math.sin(angle + 180);

			path = "M " + posX + " " + posY + "L" + x1 + " " + y1 + "";
			path += "M " + posX + " " + posY + "L" + x2 + " " + y3 + "";
			path += "M " + posX + " " + posY + "L" + x3 + " " + y3 + "";

			draw = Controller.paper.svg.path(path);

			// Change Style
			draw.attr({
				fill: Controller.params.fill,
				stroke: Controller.params.stroke,
				'stroke-width': Controller.params.strokeW,
				opacity: Controller.params.opacity / 100
			});

			drawTree(x1, y1, len * 0.75, angle + 10);
			drawTree(x2, y2, len * 0.66, angle - 20);
			drawTree(x3, y3, len * 0.75, angle + 10);

		}

	}

	drawTree(320, 240, 70, 90);

};

function splitUnicodeString(str){
	const arr = [];
	for(const char of str)
		arr.push(char)
		
	return arr;
}