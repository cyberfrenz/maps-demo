/* app.js -- our application code */

"use strict";

// UW coordinates:
// lat: 47.655
// lng: -122.3080

var mapOptions = {
	center: {lat: 47.655, lng: -122.3080},
	zoom: 14
}

// add map to the page in the "map" div
var mapElem = document.getElementById('map');

//create the map
var map = new google.maps.Map(mapElem, mapOptions);

//marker positions
// values must be numbers and not strings
var position = {
	lat: 47.655, 
	lng: -122.3080
}

//create a marker on the map
var marker = new google.maps.Marker({
	position: position,
	map: map
});

//remove marker from map
//marker.setMap(null);

//re-add the marker
//marker.setMap(map)
var infoWin = new google.maps.InfoWindow();

function onGeoPos(position){
	console.log("Lat " + position.coords.latitude);
	console.log("Lng " + position.coords.longitude);

	var myLocPosition = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
	}

	var myLocation = new google.maps.Marker({
		position: myLocPosition,
		map: map
	});

	//create a new info window
	

	//set the content(may contain html tags)
	infoWin.setContent('<p>Hello World! Greetings from ' + position.coords.latitude 
		+ ", " + position.coords.longitude + '</p>');

	//listen for click event on marker
	google.maps.event.addListener(myLocation, 'click', onMarkerClick)
}

function onGeoErr(error) {

}

if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(onGeoPos, onGeoErr,
		{enableHighAccuracy: true, maximumAge: 30000});
} else {
	console.log("Geolocation not supported")
}

function onMarkerClick() {

	map.panTo(this.getPosition()); 
	infoWin.open(map, this);
}

$.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
	.done(function(data){
		// success
	})	
	.fail(function(data) {
		// error contains error info
	})
	.always(function() {
		//called on either success or error cases
	})
