/*! colorful-background 2013-09-23 */
/**
 * The generator class
 */

function ColorfulBackgroundGenerator() {
	/**
	 * Holds all layers.
	 * @type {Array}
	 */
	this.layers = [];
}

/**
 * Returns the amount of current layers.
 *
 * @return {Number}
 */
ColorfulBackgroundGenerator.prototype.getNumberOfLayers = function() {
	return this.layers.length;
};

/**
 * Returns a ColorfulBackgroundLayer for the given index
 * @param  {Number} layerIndex
 * @return {ColorfulBackgroundLayer}
 */
ColorfulBackgroundGenerator.prototype.getLayerByIndex = function(layerIndex) {
	if (layerIndex === undefined) {
		return false;
	}
	if (layerIndex >= this.getNumberOfLayers()) {
		return false;
	}

	return this.layers[layerIndex];
};

/**
 * Adds a new layer to the generator.
 * If no position is given, push the new layer to the top (highest index).
 *
 * @param {ColorfulBackgroundLayer} layer
 * @param {Number} position
 */
ColorfulBackgroundGenerator.prototype.addLayer = function(layer, position) {
	if (position === undefined || position > this.getNumberOfLayers()) {
		this.layers.push(layer);
	} else {
		this.layers.splice(position, 0, layer);
	}
};

/**
 * Removes the layer at the given index.
 *
 * @param  {Number} layerIndex
 */
ColorfulBackgroundGenerator.prototype.deleteLayer = function(layerIndex) {
	this.layers.splice(layerIndex, 1);
};

/**
 * Returns the CSS for the current background as CSS properties.
 *
 * @param  {Boolean} keepWhitespace
 * @return {String}
 */
ColorfulBackgroundGenerator.prototype.getCSS = function(keepWhitespace) {
	var output = "background:\n\t";
	var propertyOutputs= ["","",""];
	var numberOfLayers = this.getNumberOfLayers();
	for (var i = numberOfLayers - 1; i >= 0; i--) {
		if (i === 0) {
			propertyOutputs[0] += this.layers[i].getCSSProperty(true, "-webkit-");
			propertyOutputs[1] += this.layers[i].getCSSProperty(true, "-ms-");
			propertyOutputs[2] += this.layers[i].getCSSProperty(true);
		} else {
			propertyOutputs[0] += this.layers[i].getCSSProperty(false, "-webkit-");
			propertyOutputs[1] += this.layers[i].getCSSProperty(false, "-ms-");
			propertyOutputs[2] += this.layers[i].getCSSProperty();
		}
	}
	output = output + propertyOutputs[0] + "background:\n\t" + propertyOutputs[1] + "background:\n\t" + propertyOutputs[2];
	if (keepWhitespace === undefined || keepWhitespace === false) {
		return output.trim();
	}
	return output;
};

/**
 * Returns the CSS for the current background as css class.
 *
 * @return {Sting}
 */
ColorfulBackgroundGenerator.prototype.getCSSAsText = function() {
	return ".colorful {\n" + this.getCSS(true) + "}";
};

/**
 * Set the generatey backgrouns style to an DOM elementID.
 *
 * @param  {String} elementId
 */
ColorfulBackgroundGenerator.prototype.assignStyleToElementId = function(elementId) {
	var element = document.getElementById(elementId);
	this.assignStyleToElement(element);
};

/**
 * Set the generatey backgrouns style to an DOM element.
 *
 * @param  {Object} element
 */
ColorfulBackgroundGenerator.prototype.assignStyleToElement = function(element) {
	element.setAttribute("style", this.getCSS());
};
/**
 * The layer class.
 * 
 * @param {Number} degree
 * @param {Number} hue
 * @param {Number} saturation
 * @param {Number} lightness
 * @param {Number} positionColor
 * @param {Number} positionTransparency
 */
function ColorfulBackgroundLayer(degree, hue, saturation, lightness, positionColor, positionTransparency) {
	this.degree = degree;
	this.hue = hue;
	this.saturation = saturation;
	this.lightness = lightness;
	this.positionColor = positionColor;
	this.positionTransparency = positionTransparency;

}

/**
 * Returns the CSS Property of this layer.
 * If endingWithSemicolon is true, this is the last layer and the returning string will end with a semicolon.
 * 
 * 
 * @param  {Boolean} endingWithSemicolon
 * @param  {String} prefix
 * @return {String}
 */
ColorfulBackgroundLayer.prototype.getCSSProperty = function(endingWithSemicolon, prefix) {
	var output = "";
	if (prefix !== undefined) {
		output = prefix;
	}

	output = output + "linear-gradient(" + this.degree + "deg, hsl(" + this.hue + ", " + this.saturation + "%, " + this.lightness + "%) " + this.positionColor + "%, transparent " + this.positionTransparency + "%)";

	if (endingWithSemicolon === undefined || endingWithSemicolon === false) {
		output = output + ",\n\t";
	} else {
		output = output + ";\n";
	}

	return output;
};
/**
 * The prefixes class.
 */
function ColorfulBackgroundBrowserVendorPrefixes() {
	this.mozilla = "-moz-";
	this.opera = "-o-";
	this.webkit = "-webkit-";
	this.microsoft = "-ms-";

	this.allowedPrefixes = ["", this.mozilla, this.opera, this.webkit, this.microsoft];
}

/**
 * Returns the mozilla vendor prefix.
 *
 * @return {String}
 */
ColorfulBackgroundBrowserVendorPrefixes.prototype.getMozillaPrefix = function() {
	return this.mozilla;
};

/**
 * Returns the opera vendor prefix.
 *
 * @return {String}
 */
ColorfulBackgroundBrowserVendorPrefixes.prototype.getOperaPrefix = function() {
	return this.opera;
};

/**
 * Returns the webkit vendor prefix.
 *
 * @return {String}
 */
ColorfulBackgroundBrowserVendorPrefixes.prototype.getWebkitPrefix = function() {
	return this.webkit;
};

/**
 * Returns the microsoft vendor prefix.
 *
 * @return {String}
 */
ColorfulBackgroundBrowserVendorPrefixes.prototype.getMicrosoftPrefix = function() {
	return this.microsoft;
};

/**
 * Checks if the given prefix is in the list of allowed prefixes.
 * 
 * @param  {String}  prefix
 * @return {Boolean}
 */
ColorfulBackgroundBrowserVendorPrefixes.prototype.isPrefixAllowed = function(prefix) {
	if (prefix === undefined) {
		return false;
	}

	if (this.allowedPrefixes.indexOf(prefix) === -1) {
		return false;
	}

	return true;
};