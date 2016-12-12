sg_focus = 1;
sg_visible_event = "";
try {
	if (typeof document.hidden !== "undefined") {
		sg_visible_event = "visibilitychange";
	} else if (typeof document.webkitHidden !== "undefined") {
		sg_visible_event = "webkitvisibilitychange";
	} else if (typeof document.msHidden !== "undefined") {
		sg_visible_event = "msvisibilitychange";
	} else if (typeof document.mozHidden !== "undefined") {
		sg_visible_event = "mozvisibilitychange";
	}
} catch(e) {};

if (sg_visible_event != "") {
	document.addEventListener(sg_visible_event, sg_get_visibility, false);
}

function sg_get_visibility() {
	try {
		if (sg_focus == 1) {
			sg_focus = 0;
			gml_Script_gmcallback_focusoff();
		} else {
			sg_focus = 1;
			gml_Script_gmcallback_focuson();
		}
	} catch(e) {};
}

function sg_spil_logo_show(name,xpos,ypos,siz) {
	var curobj = null;
	switch (name) {
		case "logo": curobj = sponlogoobj; break;
		case "more": curobj = moreobj; break;
		case "cross": curobj = crossobj; break;
	}
	if (curobj != null) {
		curobj.setAttribute('style','display: block; position: absolute; left: '+xpos+'px; top: '+ypos+'px; width:'+siz+'px; z-index: 1; border: 0');
	}
}

function sg_spil_logo_hide(name) {
	var curobj = null;
	switch (name) {
		case "logo": curobj = sponlogoobj; break;
		case "more": curobj = moreobj; break;
		case "cross": curobj = crossobj; break;
	}
	if (curobj != null) {
		curobj.style.display = "none";
	}
}

function sg_spil_ads() {
	if (spilapi) {
		GameAPI.GameBreak.request(gml_Script_gmcallback_spiladon, gml_Script_gmcallback_spiladoff);
	}
}

function sg_spil_splash_ok() {
	return splashshow;
}

function sg_spil_splash_show() {
	try {
		spilapiobj.Branding.displaySplashScreen(gml_Script_gmcallback_gamestart);
		if (loadingtextobj) {
			loadingtextobj.style.display = "none";
		}
		if (loadintervalid) {
			clearInterval(loadintervalid);
		}
	} catch(e) {};
	/*
	if (splashobj != null) {
		splashobj.style.display = "block";
	}
	*/
}

function sg_spil_splash_hide() {

	/*
	if (splashobj != null) {
		splashobj.style.display = "none";
	}
	*/
}

function sg_unlock_android_music() {
	try {
		unlock_play = false;
		unlock_audio = document.getElementsByTagName('audio')[0];
		unlock_audio.loop = true;
		window.addEventListener("touchend", android_play_music, false);
	} catch(e) {};
}

function sg_android_music() {
	try {
		if (unlock_play == false) {
			unlock_play = true;
		} else {
			unlock_audio.play();
		}
	} catch(e) {};
}

function sg_android_music_stop() {
	try {
		if (unlock_play == true) {
			unlock_audio.pause();
		}
	} catch(e) {};
}

function android_play_music() {
	try {
		if (unlock_play == true) {
			unlock_audio.play();
			window.removeEventListener("touchend", android_play_music, false);
		}
	} catch(e) {};
}

function sg_unlock_sound() {
	try {
		window.addEventListener("touchstart", ios_unlock_sound, false);
	} catch(e) {};
}

function ios_unlock_sound(event) {
	try {
		var buffer = g_WebAudioContext.createBuffer(1, 1, 22050);
		var source = g_WebAudioContext.createBufferSource();
		source.buffer = buffer;
		source.connect(g_WebAudioContext.destination);
		source.noteOn(0);
		window.removeEventListener("touchstart", ios_unlock_sound, false);
	} catch(e) {};
}

function sg_no_bar() {
	if(!window.location.hash)
	{
		var divh = document.getElementById('gm4html5_div_id').style.height;
		if (divh < (window.outerHeight + 200))
		{
		 document.getElementById('gm4html5_div_id').style.height = (window.outerHeight + 200) + 'px';
		}
		setTimeout ( function(){ window.scrollTo(0,1); },50);
	}
}

function RenderLoadingBar_Standard(_graphics, _width, _height, _total, _current, _loadingscreen) {
	var canvasobj = document.getElementById("loading_screen");
	var room_width  = _width;
	var room_height = _height;
	var ratio = (room_height/room_width);
	if (typeof(window.innerWidth)=='number') {
		browser_width = window.innerWidth;
		browser_height = window.innerHeight;
	} else if (document.documentElement&&document.documentElement.clientWidth) {
		browser_width = document.documentElement.clientWidth;
		browser_height = document.documentElement.clientHeight;
	} else if (document.body&&document.body.clientWidth) {
		browser_width = document.body.clientWidth;
		browser_height = document.body.clientHeight;
	}
	var multi = (browser_height / room_height);
	var new_width = (room_width * multi);
	var new_height = browser_height;
	if (new_width > browser_width) {
		multi = (browser_width / room_width);
		new_width = (room_width * multi);
		new_height = (room_height * multi);
	}
	canvasobj.width = new_width;
	canvasobj.height = new_height;
	canvasobj.style.left = browser_width/2-new_width/2+"px";
	canvasobj.style.top = browser_height/2-new_height/2+"px";
	if (_loadingscreen) {
		_graphics.drawImage(_loadingscreen, 0, 0, new_width, new_height);
		if (_loadingscreen.style.display == "block") {
			_loadingscreen.style.display = "none";
		}
	}
	var perc = (bar_img_w/_total)*_current;
	var bar_x = bar_img_x*multi;
	var bar_y = bar_img_y*multi;
	var bar_w = perc*multi;
	var bar_h = bar_img_h*multi;
	var yy = 436 * multi;
	var ww = 22 * multi;
	if (_current != 0) {
		if (loadbarobj) {
			_graphics.drawImage(loadbarobj, 0, 0, perc, bar_img_h, bar_x, bar_y, bar_w, bar_h);
		}
	}
}