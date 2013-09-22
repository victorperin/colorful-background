$(document).ready(function() {
	// The Generator
	var generator = new ColorfulBackgroundGenerator();

	// Get all elements for later use.
	var eleCodeBox = $(".code-box");
	var eleCodeField = $("code");
	var eleRandomize = $(".randomize");
	var btnShowCodeBox = $(".show-code");
	var btnShowSettings = $(".settings");
	var eleSettingsBox = $(".settings-box");
	var eleHideCodeBox = $(".hide-code");
	var eleHideSettingsBox = $(".hide-settings");
	var eleCopyCode = $(".copy-code");
	var eleSettingsSliders = $("input");

	/**
	 * Show the code box.
	 *
	 * @return {undefined}
	 */
	btnShowCodeBox.click(function() {
		$(this).blur();
		btnShowCodeBox.hide();
		eleCodeBox.show();
		return;
	});

	/**
	 * Hide the code box.
	 *
	 * @return {undefined}
	 */
	eleHideCodeBox.click(function() {
		btnShowCodeBox.show();
		eleCodeBox.hide();
		$(this).blur();
		return;
	});

	/**
	 * Show the settings box.
	 *
	 * @return {undefined}
	 */
	btnShowSettings.click(function() {
		$(this).blur();
		btnShowSettings.hide();
		eleSettingsBox.show();
		return;
	});

	/**
	 * Hide the settings box.
	 *
	 * @return {undefined}
	 */
	eleHideSettingsBox.click(function() {
		// btnShowSettings.show() does add "display: block" but an inline-block is needed here.
		btnShowSettings.css('display','inline-block');
		eleSettingsBox.hide();
		$(this).blur();
		return;
	});

	/**
	 * Randomly change the color of the background.
	 *
	 * @return {undefined}
	 */
	eleRandomize.click(function() {
		changeColorRandomly();
		$(this).blur();
		return;
	});

	eleSettingsSliders.on('change input', function() {
		changeColor($(this));
	});

	/**
	 * Inits the page.
	 *
	 * @return {undefined}
	 */

	function init() {
		btnShowCodeBox.hide();
		eleSettingsBox.hide();

		// Add 4 default Layers
		var randomNumber = Math.ceil(Math.random() * 20);

		generator.addLayer(new ColorfulBackgroundLayer(315, randomNumber, 100, 70, 50, 100));
		generator.addLayer(new ColorfulBackgroundLayer(225, randomNumber + 60, 100, 70, 10, 80));
		generator.addLayer(new ColorfulBackgroundLayer(135, randomNumber + 120, 100, 70, 10, 80));
		generator.addLayer(new ColorfulBackgroundLayer(45, randomNumber + 180, 100, 70, 0, 70));

		updateWebsiteElements();
	}

	/**
	 * Walks through all layers and changes the hue randomly.
	 * @return {undefined}
	 */

	function changeColorRandomly() {
		for (var i = generator.getNumberOfLayers() - 1; i >= 0; i--) {
			generator.getLayerByIndex(i).hue = Math.ceil(Math.random() * 359);
			generator.getLayerByIndex(i).lightness = Math.ceil(Math.random() * 10) + 65;
			generator.getLayerByIndex(i).saturation = Math.ceil(Math.random() * 10) + 90;
		}

		updateWebsiteElements();

	}

	/**
	 * Change the color of a layer.
	 *
	 * @param  {Object} element
	 * @return {Boolean}
	 */

	function changeColor(element) {
		if (element === undefined) {
			return false;
		}

		var sliderId = element.attr('id').split("-");
		if (sliderId[0] !== "layer") {
			return false;
		}

		var layer = generator.getLayerByIndex(sliderId[1]);

		switch (sliderId[2]) {
			case "hue":
				layer.hue = element.val();
				break;
			case "lightness":
				layer.lightness = element.val();
				break;
			case "saturation":
				layer.saturation = element.val();
				break;
		}

		updateWebsiteElements();

	}

	/**
	 * Updates the settings sliders, the background and the code box.
	 * @return {undefined}
	 */

	function updateWebsiteElements() {
		for (var i = generator.getNumberOfLayers() - 1; i >= 0; i--) {
			$("#layer-" + i + "-hue").val(generator.getLayerByIndex(i).hue);
			$("#layer-" + i + "-lightness").val(generator.getLayerByIndex(i).lightness);
			$("#layer-" + i + "-saturation").val(generator.getLayerByIndex(i).saturation);
		}

		// Assign generated style to the body
		generator.assignStyleToElementId("colorful");

		// Update output code
		eleCodeField.text(generator.getCSSAsText());
		console.log(updateWebsiteElements);
	}

	init();
});