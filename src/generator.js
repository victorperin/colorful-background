/**
 * The Generator contains the layers used to generate the style.
 *
 * First layer in the list is the lowest drawn layer in the CSS background property.
 */

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