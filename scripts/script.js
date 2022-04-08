// Random Number
// Max is non inclusive
function randomNumber(max) {
	return Math.ceil(Math.random() * max) - 1;
}

// Sets background to a gradient with a random color
function randomGradient() {
	let darks = [
		"darkblue",
		"red",
		"maroon"
	];

	let lights = [
		"lightblue",
		"blue",
		"orange"
	];

	let num = randomNumber(darks.length);

	document.body.style.background = 'linear-gradient(to bottom right,' + darks[num] + ',' + lights[num] + ')';
	document.body.style['background-size'] = "200% 200%";
	document.body.style['background-attachment'] = "fixed";
}

// When window opens, setup the background
document.addEventListener('DOMContentLoaded', (event) => {
    randomGradient();
});