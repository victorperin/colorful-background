$(document).ready(function () {
	// The Generator
	var generator = new ColorfulBackgroundGenerator();
	
	var eleCodeBox = $(".code-box");
	var eleCodeField = $("code");
	var eleRandomize = $(".randomize");
	var btnShowCodeBox = $(".show-code");
	var btnSettings = $(".settings");
	var eleHideCodeBox = $(".hide-code");
	var eleCopyCode = $(".copy-code");

	btnShowCodeBox.click(function(){
		btnShowCodeBox.hide();   
		eleCodeBox.show();
		$(this).blur();
		return;
	});

	eleHideCodeBox.click(function(){
		btnShowCodeBox.show();   
		eleCodeBox.hide();
		$(this).blur();
		return;
	});

	eleRandomize.click(function(){
		changeColor();
		$(this).blur();
		return;
	});

	function init(){
		btnShowCodeBox.hide();
		//btnShowCodeBox.show();
		btnSettings.hide();
		//btnSettings.show();

		// Add 4 default Layers
		var randomNumber = Math.ceil(Math.random() * 20);   

		generator.addLayer(new ColorfulBackgroundLayer(315, randomNumber, 100, 70, 50, 100));
		generator.addLayer(new ColorfulBackgroundLayer(225, randomNumber+60, 100, 70, 10, 80));
		generator.addLayer(new ColorfulBackgroundLayer(135, randomNumber+120, 100, 70, 10, 80));
		generator.addLayer(new ColorfulBackgroundLayer(45, randomNumber+180, 100, 70, 0, 70));

		// Assign generated style to the body
		generator.assignStyleToElementId("colorful");

		// Update output code
		eleCodeField.text(generator.getCSSAsText());
	}

	function changeColor(){
		var numberOfLayers = generator.getNumberOfLayers();

		for (var i = numberOfLayers - 1; i >= 0; i--) {				
			generator.layers[i].hue = Math.ceil(Math.random() * 255);
		}
		
		// Assign generated style to the body
		generator.assignStyleToElementId("colorful");

		// Update output code
		eleCodeField.text(generator.getCSSAsText());

	}


	init();
});