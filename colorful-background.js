/*! colorful-background 2013-09-17 */
function ColorfulBackgroundGenerator() {
	this.layers = [];
	
}

ColorfulBackgroundGenerator.prototype.getNumberOfLayers = function(){
	return this.layers.length;
};

ColorfulBackgroundGenerator.prototype.addLayer = function(layer, position){
if(position === undefined || position > this.getNumberOfLayers){
	this.layers.push(layer);	
} else {
	this.layers.splice(position, 0, layer);	
}
 };


ColorfulBackgroundGenerator.prototype.getCSSAsText = function() {
    return ".colorful {\n" + this.getCSS(true) + "}";
};

ColorfulBackgroundGenerator.prototype.getCSS = function(keepWhitespace) {
	var output = "background:\n\t";
	var propertyOutputWebkit = "";
    var propertyOutputDefault = "";
    var numberOfLayers = this.getNumberOfLayers();
    
	for (var i = numberOfLayers - 1; i >= 0; i--) {
		if(i === 0){
			propertyOutputWebkit += this.layers[i].getCSSProperty(true, "-webkit-");
            propertyOutputDefault += this.layers[i].getCSSProperty(true);
		} else {
			propertyOutputWebkit += this.layers[i].getCSSProperty(false, "-webkit-");
            propertyOutputDefault += this.layers[i].getCSSProperty();
		}
	}

	output = output + propertyOutputWebkit + "background:\n\t" + propertyOutputDefault;

	if(keepWhitespace === undefined || keepWhitespace === false){
		return output.trim();	
	}
	return output;
};

/*
 * Set this stile to an elementID.
 */
ColorfulBackgroundGenerator.prototype.assignStyleToElementId = function(elementId) {
	var element = document.getElementById(elementId);
	this.assignStyleToElement(element);
};

/*
 * Set this stile to an element.
 */
ColorfulBackgroundGenerator.prototype.assignStyleToElement = function(element) {
		element.setAttribute("style",this.getCSS());
};
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