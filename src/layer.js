/**
 * The layer defines the gradient. Layers are combined in the generator the get a colorful background.
 *
 */

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