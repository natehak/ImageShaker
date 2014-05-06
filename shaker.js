// Canvas variables
var canvas = document.getElementById("shaker");
var context = canvas.getContext("2d");

// Constants
var VERTICAL_CORRECTION = -50;
var HORIZONTAL_CORRECTION = 2;

var WHITE = "#FFFFFF";
var BLACK = "#000000";
var FONT = "80px Impact";

var OUTLINE_WIDTH = 4.5;

// Image variables
var image = new Image();

var sourceX;
var sourceY;
var sourceHeight;
var sourceWidth;

// How many pixels we should shake by
var shakeAmount = parseInt(getParameterByName("shakeamount"));
var shakeTime = parseInt(getParameterByName("shaketime"));

// Variables for drawing TEXT
var bigText = getParameterByName("bigtext");

// Right, down, left, up
var directions = ["right", "down", "left", "up"];
var i = 0;

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function drawFrame() {

	// Shake it baby
	index = i % directions.length;
	
	direction = directions[index];

	if (direction == "right") {
		sourceX += shakeAmount;
		sourceWidth += shakeAmount;
	} else if (direction == "down") {
		sourceY += shakeAmount;
		sourceHeight += shakeAmount;
	} else if (direction == "left") {
		sourceX -= shakeAmount;
		sourceWidth -= shakeAmount;
	} else if (direction == "up") {
		sourceY -= shakeAmount;
		sourceHeight -= shakeAmount;
	}

	// Draw the image
	context.fillStyle = WHITE;
	context.fillRect(0, 0, 3000, 1200);
	context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight);

	// Draw the text
	fontX = sourceWidth / HORIZONTAL_CORRECTION;
	fontY = sourceHeight + VERTICAL_CORRECTION;

	context.font = FONT;
	context.textAlign = "center";

	context.fillStyle = WHITE;
	context.fillText(bigText, fontX, fontY);

	context.strokeStyle = BLACK;
	context.lineWidth = OUTLINE_WIDTH;
	context.strokeText(bigText, fontX, fontY);

	i++;
}

image.onload = function() {
	// Variables for cropping
	sourceX = 0;
	sourceY = 0;
	sourceWidth = image.width - shakeAmount;
	sourceHeight = image.height - shakeAmount;

	setInterval(drawFrame, shakeTime);
};

image.src = getParameterByName("imagelink");
