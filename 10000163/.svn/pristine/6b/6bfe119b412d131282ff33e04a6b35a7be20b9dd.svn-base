window.wstoreWeb = false;
window.f = true;

function handleMouseDown(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  evt.target.style.cursor = 'default';
}

function handleMouseUp(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  evt.target.style.cursor = '';
}

document.getElementById('embed-com.immanitas.crazybelts.GwtDefinition').addEventListener('mousedown', handleMouseDown, false);
document.getElementById('embed-com.immanitas.crazybelts.GwtDefinition').addEventListener('mouseup', handleMouseUp, false);



//-------------------------------------------------------------------
//-------------------------- AUTOADJUST & FULLSCREEN ----------------
//-------------------------------------------------------------------
var fullscreen = false;
function calcScreen(w, h) {
	function gcd (width, height) { // greatest common divisor (GCD) 
		return (height == 0) ? width : gcd(height, width%height);
	}
	
	var heightScreen = fullscreen ? screen.availHeight : document.documentElement.clientHeight;
	
	var r = gcd(w, h);
	var aspectW = (w/r);
	var aspectH = (h/r);
	
	var newWidth = ((heightScreen/aspectH)*aspectW);
	
	return {w: newWidth, h: heightScreen};
}
var wh = calcScreen(720, 1280);

function makeScreenAdjust() {		 	
	document.getElementById('DIVID_bodySplash_box').style.width = wh.w+"px";
	document.getElementById('DIVID_bodySplash_box').style.height = wh.h-+"px";
	
	fullscreen = 	document.fullscreen ||
					document.mozFullScreen ||
					document.webkitIsFullScreen ||
					document.msFullscreenElement;
	
	var elem = document.querySelector("canvas");
	if(elem != undefined) {
		elem.setAttribute('width', wh.w);
		elem.setAttribute('height', wh.h);
	} else setTimeout(makeScreenAdjust,100);
};


function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
	  !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
	if (document.documentElement.requestFullscreen) {
	  document.documentElement.requestFullscreen();
	} else if (document.documentElement.msRequestFullscreen) {
	  document.documentElement.msRequestFullscreen();
	} else if (document.documentElement.mozRequestFullScreen) {
	  document.documentElement.mozRequestFullScreen();
	} else if (document.documentElement.webkitRequestFullscreen) {
	  document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	}
  } else {
	if (document.exitFullscreen) {
	  document.exitFullscreen();
	} else if (document.msExitFullscreen) {
	  document.msExitFullscreen();
	} else if (document.mozCancelFullScreen) {
	  document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) {
	  document.webkitExitFullscreen();
	}
  }
}
function handleKeyUp(e) {
  if(e.keyCode==13 && e.altKey) toggleFullScreen();
}

window.addEventListener('keyup', handleKeyUp, false);
/*document.addEventListener('fullscreenchange', makeScreenAdjust, false);
document.addEventListener('mozfullscreenchange', makeScreenAdjust, false);
document.addEventListener('webkitfullscreenchange', makeScreenAdjust, false);
document.addEventListener('msfullscreenchange', makeScreenAdjust, false);*/

//makeScreenAdjust();



//-------------------------------------------------------------------
//-------------------------- MOBILE DETECT --------------------------
//-------------------------------------------------------------------
var md = new MobileDetect(window.navigator.userAgent);
var deviceType;
if((md.mobile() != "" && md.mobile() != undefined) || (md.phone() != "" && md.phone() != undefined))
	deviceType = "MOBILE";
else
	deviceType = "PC";
console.log('Mobile detected: '+md.mobile());
console.log('Phone detected: '+md.phone());
console.log('Game treatment: '+deviceType);

webGLExist = function() {
	e = document.createElement('canvas');
	e.width = 32;
	e.height = 32; 
	var w;
	
	try {
		w = e.getContext("webgl");
	} catch (x) {}
	if(w == undefined) {
		try {
			w = e.getContext("experimental-webgl");
		} catch (x) {
			w = undefined;
		}
	}
	
	if(w == undefined) return false;
	return true;
};




//-------------------------------------------------------------------
//-------------------------- MAIN --------------------------
//-------------------------------------------------------------------
if(webGLExist()) {
	document.write('<script type="text/javascript" src="com.immanitas.crazybelts.GwtDefinition/com.immanitas.crazybelts.GwtDefinition.nocache.js"></script>');	
} else {
	var str;
	if(deviceType == "MOBILE") {
		str = "This version of the game has not being designed for mobile.<br /> Get native version here:<br />"+
				'<a href="https://play.google.com/store/apps/details?id=com.immanitas.crazybelts1&hl=es-419"><img src="http://developer.android.com/images/brand/en_generic_rgb_wo_45.png" /></a>'+
				'<a href="https://itunes.apple.com/app/id846037062" style="margin-left:10px"><img src="App_Store_Badge_US-UK_135x40.png" /></a>';
	} else if(deviceType == "PC") {
		str = "WebGL seems not to be present in your browser, please update to the latest version and try again";
		if(md.userAgent() == "Safari") {
			str = "You need to enable WegGL in your browser settings:<br />"+
				"1. Open the Safari menu and select Preferences.<br />"+
				"2. Click the Advanced tab in the Preferences window.<br />"+
				"3. At the bottom of the window, check the Show Develop menu in menu bar checkbox.<br />"+
				"4. Open the Develop menu in the menu bar and select Enable WebGL.";
		}
	}
	
	document.getElementById('embed-com.immanitas.crazybelts.GwtDefinition').innerHTML = "<div style='text-align:center'>"+str+"</div>";
}

