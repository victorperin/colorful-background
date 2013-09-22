/**
 * Helper to get browser vendor prefixes.
 */

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