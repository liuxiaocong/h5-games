(function() {

	window.keydown = {};
	window.keyup = {};

	var specialKeys = {
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
			77: "m", 82: "r",
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
	};

	function keyName(event) {
		return specialKeys[event.which] ||
		String.fromCharCode(event.which).toLowerCase();
	}

	if (tortilla.platform != "cocoonjs") {
		
	//	console.log("GOING TO BIND KEYDOWN - 1");
		$(document).bind("keydown", function(e) {
	//		console.log("KEYDOWN", e);//, keyName(e));
			keyup[keyName(e)] = false;
			keydown[keyName(e)] = true;
	//		e.preventDefault();
		});
	//	console.log("KEYDOWN BOUND!");
	
		$(document).bind("keyup", function(e) {
			keyup[keyName(e)] = true;
			keydown[keyName(e)] = false;
	//		e.preventDefault();
		});
		
	}

})();
