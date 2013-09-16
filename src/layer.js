/*
 * A Layer defines the gradient.
 *
 */

function ColorfulBackgroundLayer(degree, hue, saturation, lightness, positionColor, positionTransparency){
	this.degree = degree;
	this.hue = hue;
	this.saturation = saturation;
	this.lightness = lightness;
	this.positionColor = positionColor;
	this.positionTransparency = positionTransparency;
}


ColorfulBackgroundLayer.prototype.getCSSProperty = function(endingWithSemicolon, prefix) {
	var output = "";
	if(prefix !== undefined){
		output = prefix;
	}

	output = output + "linear-gradient("+this.degree+"deg, hsl("+this.hue+", "+this.saturation+"%, "+this.lightness+"%) "+this.positionColor+"%, transparent "+this.positionTransparency+"%)";

	if(endingWithSemicolon === undefined || endingWithSemicolon === false){
		output = output + ",\n\t";
	} else {
		output = output + ";\n";
	}

	return output;
};