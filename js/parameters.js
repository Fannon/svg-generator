/////////////////////////////////
// Parameters - MODEL ///////////
/////////////////////////////////

/**
 * Creates an instance of Parameters
 *
 * @constructor
 */
function Parameters() {

	// Attributes: //
	
	/** Default Algorithm */
	this.selectedAlgo = 'rotatedEll';

	/**
	 * Default Fade Time
	 * @const
	 */
	this.fadeTime = 400;

	/** Standard Parameters (Array) */
	this.standard = ['bgcolor', 'count', 'stroke', 'strokeW', 'fill', 'opacity', 'minsize', 'maxsize', 'paddingV', 'paddingH'];

	/** Custom Parameters added (Array) */
	this.added = [];

	// Save jQuery References (Objects) in Variables ( => Speed Optimization)
	// TODO: Maybe better UNDO this. Increases Startup Time.
	this.optionboxRef = $('select#algoselect');
	this.textboxRef = $('textarea[name="textbox"]');

	for (var el in this.standard) {
		var id = this.standard[el];
		this[id + 'Ref'] = $('input[name="' + id + '"]');
	}

	// Add all available Algorithms to Optionbox (Auto-Generate)
	for (var key in Algorithms.title) {
		var selectoption = '<option value="' + key + '">' + Algorithms.title[key] + '</option>';
		this.optionboxRef.append(selectoption);
	}
}

// Methods: //

/**
 * Get current Parameters from HTML and save them into the Parameters Variables
 */
Parameters.prototype.get = function() {

	console.log('Parameters.get() called.');

	// Get standard Parameters
	for (var el in this.standard) {
		var id = this.standard[el];
		this[id] = this[id + 'Ref'].val();
	}

	// Get textbox value
	this.textbox = this.textboxRef.val();

	// Get custom-generated Parameters
	for (var el in this.added) {
		var id = this.added[el];
		this[id] = $('input[name="' + id + '"]').val();
	}
};

/**
 * Reset the Parameters Box to default.
 */
Parameters.prototype.reset = function() {
	console.log('Parameters resetted.');
	// Show all hidden Parameters again
	$('tr').show();
	// Remove all custom generated Parameters
	$('.generated').remove();
	this.added = [];
};

/**
 * Set multiple Parameters and write them into the ParametersBox.
 *
 * @param {String{}} args Takes an Object with key / values that map to existing Parameters
 */
Parameters.prototype.set = function(args) {

	for (var el in this.standard) {
		var id = this.standard[el];
		$('input[name="' + id + '"]').val(args[id]);
	}

	$('textarea[name="textbox"]').val(args.textbox);
};

/**
 * Randomize the Parameters values (individually!)
 */
Parameters.prototype.randomize = function() {

	this.bgcolorRef.val(Math.rndHex());
	this.countRef.val(Math.rnd(1, 70));
	this.strokeRef.val(Math.rndHex());
	this.strokeWRef.val(Math.rnd(1, 25));
	this.fillRef.val(Math.rndHex());
	this.opacityRef.val(Math.rnd(1, 100));
	this.minsizeRef.val(Math.rnd(1, 70));
	this.maxsizeRef.val(Math.rnd(1, 250));
	this.paddingVRef.val(Math.rnd(-100, 240));
	this.paddingHRef.val(Math.rnd(-100, 320));
};

/**
 * Hides multiple standard parameters
 *
 * @param  {String[]} args String Array with list of existing standard parameters to hide
 */
Parameters.prototype.hide = function(args) {

	for (var el in args) {
		$('tr#' + args[el]).hide();
	}

};

/**
 * Auto-Generate additional Parameters depending following arguments:
 *
 * @param  {string} id    Unique name of the Parameter
 * @param  {string} title Title for the frontend
 * @param  {string} desc  Description to appear in the hover
 * @param  {string} value Value to initialize with
 */
Parameters.prototype.add = function(id, title, desc, value) {

	var html = '<tr id="' + id + '" class="generated" title="' + desc + '">';
	html += '<td>' + title + '</td>';
	html += '<td><input type="text" name="' + id + '" value="' + value + '" /></td>';
	html += '</tr>';

	// Add generated html after standard Parameters
	$('tr#textbox').before(html);

	// Add Tipsy Support to new Parameter
	$('tr#' + id).tipsy({
		gravity: 'w'
	});

	// Save new Parameter in Parameters.added Array
	this.added.push(id);

};

/**
 * Validates entered Parameters
 * This does not validate every Parameter but the most important ones.
 *
 * @param {boolean} validates True if every Parameter validated.
 */
Parameters.prototype.validate = function() {

	// Reset Error Messages first:
	$('tr').removeClass('error');

	// Validates Boolean
	var validates = true;

	/**
	 * Validates Numbers (Helper Function)
	   Colors and Custom Parameters aren't validated - yet.
	 *
	 * @param  {string} id  Unique name of the Parameter
	 * @param  {number} min Must be equal or bigger than this number
	 * @param  {number} max Must be equal or smaller than this number
	 * @param  {string} s   Optional String that validates true
	 * @param  {boolean} validates True if every Parameter validated.
	 */
	function valNumber(id, min, max, s) {

		var val = $('input[name="' + id + '"]').val();

		// Value must be a Number and between (including) min and max.
		// Also the value s is valid, if used.
		if ((!isNaN(val)) && val >= min && val <= max || val == s) {

			// Validation passed
			
		} else {

			console.warn('Parameter "' + id + '" with value "' + val + '" did not pass validation.(Not a valid Number)');
			$('#' + id).addClass('error');
			validates = false;

		}
	}

	// Check specific Parameters:
	valNumber('count', 0, 8096);
	valNumber('strokeW', 0, 200, 'none');
	valNumber('opacity', 0, 100);
	valNumber('minsize', 0, 8096);
	valNumber('maxsize', -8096, 8096);
	valNumber('paddingV', -8096, 8096);
	valNumber('paddingH', -8096, 8096);

	return validates;

};