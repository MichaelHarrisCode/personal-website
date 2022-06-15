/**
 * 
 * Global Variables
 * 
 */
var json_files;
$.getJSON("portfolio/files.json", function(data) {
	json_files = data;
});

var curr_json = 0;



/**
 * 
 * Functions
 * 
 */

// Sets the data with a transition
function data_transition(json_file) {
	// Fades content out
	$("#title, #image-div, #skills-div, #about-div").addClass("fade");

	// Sets the data after 500ms
	setTimeout(set_data, 500, json_file);

	// Fades content back after 500ms
	setTimeout(function() {
		$("#title, #image-div, #skills-div, #about-div").addClass("fade-back");
	}, 500);

	// Removes fade classes after 1000ms
	setTimeout(function() {
		$("#title, #image-div, #skills-div, #about-div").removeClass("fade fade-back");
	}, 1000);
}

/**
 * This is a bit weird and complicated for me, so I'm gonna make
 * a large comment.
 * 
 * This opens up the given json file, then runs a function to
 * replace all the data on the page with the data from the json
 * file.
 * 
 * If opening the json file fails, it'll print that to console.
 */
function set_data(json_file) {
	$.getJSON(json_file, function(data) {
		// Adds title
		$("#title").html(data["title"]);

		// Implements skills list
		// I'm sure there's a better way to do this...
		$("#skills-element").html("");
		data["skills"].forEach(function(skill) {
			$("#skills-element").append(`<li>${skill}</li>`);
		});
		
		// Implements about section
		let about_size = data["about"].length;
		$("#about-text").html("");
		data["about"].forEach(function(about, index) {
			$("#about-text").append(`<p class="text-white h5">${about}</p>`);

			// Puts a break line after each paragraph, except last one
			if (index < about_size - 1) {
				$("#about-text").append(`<br>`);
			}
		});

		// Changes a couple element attributes
		$("#image-element").attr("src", data["image"]);
		$("#github-link").attr("href", data["github"]);
	})
		.fail(function() {
			console.log("FAILURE LOADING JSON FILE");
		});
}

// Loads in next JSON file
function next_json() {
	curr_json += 1;
	curr_json %= json_files.length;

	data_transition(json_files[curr_json]);
}

// Loads in previous JSON file
function prev_json() {
	curr_json -= 1;
	curr_json %= json_files.length;
	curr_json = Math.abs(curr_json)

	data_transition(json_files[curr_json]);
}

$(document).ready(function() {
	set_data(json_files[curr_json]);
});