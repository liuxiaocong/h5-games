/**
 * Created by Christiaan Duim on 1-10-13.
 */
"use strict";

var needToLoad = 0;
var allAssetsLoaded = function(){};

function strokedText(g, text, x, y) {
	g.strokeText(text, x, y);
	g.fillText(text, x, y);
}

function drawRichText(g, x, y, text) {
	text.forEach(function(txa) {
		var word = txa[0];
		var fill = txa[1];
		g.fillStyle = fill;
		g.strokeText(word, x, y);
		g.fillText(word, x, y);
		x += g.measureText(word).width;
	});
}

function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function signum(v) {
	if (v == 0) return 0;
	if (v > 0) return 1;
	return -1;
}

function clamp(v, min, max) {
	if (v < min) return min;
	if (v > max) return max;
	return v;
}

// inherit() returns a newly created object that inherits properties from the
// prototype object p.  It uses the ECMAScript 5 function Object.create() if
// it is defined, and otherwise falls back to an older technique.
function inherit(p) 
{
    if (p == null) throw TypeError(); // p must be a non-null object
    if (Object.create)                // If Object.create() is defined...
        return Object.create(p);      //    then just use it.
    var t = typeof p;                 // Otherwise do some more type checking
    if (t !== "object" && t !== "function") throw TypeError();
    function f() {};                  // Define a dummy constructor function.
    f.prototype = p;                  // Set its prototype property to p.
    return new f();                   // Use f() to create an "heir" of p.
}

function drawLine(context, point1, point2)
{
    context.beginPath();
    context.moveTo(point1.x, point1.y);
    context.lineTo(point2.x, point2.y);
    context.stroke();
}

//T ranging from 0 to 1
//Points follow the same pattern as http://www.w3schools.com/tags/canvas_beziercurveto.asp
function getBezierPoint(t, p0, p1, p2, p3) 
{
    var cX = 3 * (p1.x - p0.x),
        bX = 3 * (p2.x - p1.x) - cX,
        aX = p3.x - p0.x - cX - bX;
          
    var cY = 3 * (p1.y - p0.y),
        bY = 3 * (p2.y - p1.y) - cY,
        aY = p3.y - p0.y - cY - bY;
          
    var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
    var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;
          
    return {x: x, y: y};
}

function drawPoint(context, point)
{
    context.fillRect(point.x, point.y, 1, 1);
}

function getRandomArrayItem(array)
{
	return array[getRandomInt(0, array.length-1)];
}

function cacheSuffix() {
	return tortilla.platform == "browser" ? ("?v=" + tortilla.BUILD_TIME) : "";
}

function loadSound(pathMP3, pathOGG, loop)
{
    needToLoad++;
    
    var suffix = cacheSuffix();
    pathMP3 = pathMP3 + suffix;
    pathOGG = pathOGG + suffix;
    
    var urls = (navigator.userAgent.match(/firefox/i) != null ? [pathOGG] : [pathOGG, pathMP3]);
    
    //console.log("loadimage, urls: " + urls +  " | need to load: " + needToLoad);

    var sound = new Howl({
        urls: urls,
        loop: loop,
        onload: function(){
        	assetLoaded();
        },
        onloaderror:function(e){
            console.log("SOUND LOAD ERROR: " + urls, JSON.stringify(e));
        }
    });


    /*   image.onLoad = function(){
     console.log("image loaded")
     imageLoaded(image);
     };*/

    //console.log("load image")
    //image.src = path;

    return sound; //{stop:function(){}, play:function(){}};
}

function drawImageScaled(context, img, x, y, scale) {
	context.drawImage(img, x, y, img.width*scale, img.height*scale);
}

function loadImage(path, onload)
{
    needToLoad++;
    //console.log("loadimage, path: " + path +  " | need to load: " + needToLoad);

    var image = new Image();

    image.addEventListener("load",
		function(){
		    assetLoaded();
		    if (typeof onload !== "undefined") onload();
		});
    
    image.addEventListener("error",

		function(){
	    	console.log("IMAGE LOAD ERROR: " + path);
	    });

 /*   image.onLoad = function(){
        console.log("image loaded")
        imageLoaded(image);
    };*/

    image.src = path + cacheSuffix();

    return image;
}

var getJSON;
if (typeof $ === "undefined") {
	getJSON = function(path, cb) {
		var req = new XMLHttpRequest();
		req.open("GET", path, true);
		req.onload = function() {
			cb(JSON.parse(req.responseText));
		};
		req.send();
	};
} else {
	getJSON = $.getJSON;
}

function loadJSON(path, returnFunction) {
	console.log("Loading JSON, path: " + path);
	needToLoad++;
	getJSON(path + cacheSuffix(), function(data) {
		console.log("JSON Loaded, path: " + path);
		assetLoaded();
		returnFunction(data);
	});
}

function assetLoaded()
{
    needToLoad--;

    if (needToLoad == 0){
    	allAssetsLoaded();
    }
}

function secondsToTimeObject(secs)
{
    var minutes = Math.floor(secs / 60);
    var seconds = secs % 60;

    var obj = {
        "minutes": minutes,
        "seconds": seconds
    };
    
    return obj;
};

function showHandCursor(){
	document.body.style.cursor='pointer';
};

function showDefaultCursor(){
	document.body.style.cursor='default';
};