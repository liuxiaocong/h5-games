var SG_Hooks = {
	documentLoaded 		: false,
	
	getLanguagesCalled 	: false,
	startCalled 		: false,
	levelUpCalled 		: false,
	gameOverCalled		: false,
	
	setOrientationHandlerCalled : false,
	setResizeHandlerCalled 		: false,

	getLanguage : function( supportedLanguages ){
		if( !SG_Hooks.documentLoaded ){
			throw "Softgames - getLanguage: Do not call getLanguage before document is fully loaded. use window.onload to start your game!";
		}
		else if( (Object.prototype.toString.call(supportedLanguages)).toLowerCase() != "[object array]" ){
			throw "Softgames - getLanguage: No supported languages given. Please call SG_Hooks.getLanguage(['en','es',...]) - Array of Strings required!";
		}
		
		var randomIndex = Math.floor(Math.random()*supportedLanguages.length);
		var randomLanguage = supportedLanguages[randomIndex];
		
		SG_log( "Softgames - getLanguage: '"+supportedLanguages.toString()+"' successfully initiated. Randomly chosen was '" + randomLanguage +"'" );
		SG_Hooks.getLanguagesCalled = true;
		
		return randomLanguage;
	},
	
	start : function(){
		if( !SG_Hooks.documentLoaded ){
			throw "Softgames - start: Do not call start() before document is fully loaded. use window.onload to start your game!";
		}
		SG_Hooks.startCalled = true;
	},
	
	levelUp : function(level, score){
		if( !SG_isNothing(level) && !SG_isInt(level) ){
			throw "Softgames - levelUp(level,score): The 'level'-parameter must be an integer '"+(typeof level)+"' given.";
		}

		// score is optional
		if( !SG_isNothing(score) && !SG_isInt(score) ){
			throw "Softgames - levelUp(level,score): The 'score'-parameter must be an integer, '"+(typeof score)+"' given.";
		}

		SG_log("Softgames - levelUp: call successful - level=" + level + ", score=" + score);
		SG_Hooks.levelUpCalled = true;
	},
	
	gameOver : function(level, score){
		if( !SG_isNothing(level) && !SG_isInt(level) ){
			throw "Softgames - gameOver(level,score): The 'level'-parameter must be an integer '"+(typeof level)+"' given.";
		}

		if( !SG_isNothing(score) && !SG_isInt(score) ){
			throw "Softgames - gameOver(level,score): The 'score'-parameter must be an integer, '"+(typeof score)+"' given.";
		}

		SG_log("Softgames - gameOver: call successful - level=" + level + ", score=" + score);
		SG_Hooks.gameOverCalled = true;
	},
	setOrientationHandler : function( f ){
		
		if( !SG_isFunction(f) ){
			throw "Softgames - setOrientationHandler: The 'f'-parameter must be a function, '"+(typeof f)+"' given.";
		}
		
		SG_log("Softgames - setOrientationHandler: call successful - orientationHandler=" + f);
		SG_Hooks.setOrientationHandlerCalled = true;
	},
	
	setResizeHandler: function ( f ){
		if( !SG_isFunction(f) ){
			throw "Softgames - setResizeHandler: The 'f'-parameter must be a function, '"+(typeof f)+"' given.";
		}
		
		SG_log("Softgames - setResizeHandler: call successful - resizeHandler=" + f);
		SG_Hooks.setResizeHandlerCalled = true;
	}
};

SG_isInt = function(i){ return i === +i && i === (i|0); }
SG_isNothing = function(v){ return v==='' || v === null || typeof v == "undefined" }
SG_isFunction = function(f){ return typeof f == 'function'; }
SG_log = function(s){console.log(s);}
SG_load = function(){ SG_Hooks.documentLoaded = true; }

SG_check = function(){
	var failed = false;
	
	SG_log( "-------- Checking integration of Softgames-Hooks --------" );
	if( !SG_Hooks.getLanguagesCalled ){
		SG_log("SG_Hooks.getLanguage was not called. You have to call SG_Hooks.getLanguage(['en','es',...]); *after* window.onload.");
		failed = true;
	}
	
	if( !SG_Hooks.setOrientationHandlerCalled ){
		SG_log("SG_Hooks.setOrientationHandler was not called. You have to provide a game-function, that handles changes of orientation for the game.");
		failed = true;
	}

	if( !SG_Hooks.setResizeHandlerCalled ){
		SG_log("SG_Hooks.setResizeHandler was not called. You have to provide a game-function, that handles changes of window-size for the game.");
		failed = true;
	}
	
	if( !SG_Hooks.startCalled ){
		SG_log("SG_Hooks.start was not called. You have to call SG_Hooks.start(); when player starts the game.");
		failed = true;
	}
	
	if( !SG_Hooks.levelUpCalled && !SG_Hooks.gameOverCalled ){
		SG_log("You have to call SG_Hooks.levelUp or SG_Hooks.gameOver when player leveled up or game is over.");
		failed = true;
	}
	
	if( failed ){
		SG_log( "-------- Check FAILED --------" );
		return false;
	}
	else{
		SG_log( "-------- Check PASSED --------" );
		return true;
	}
}
if(window.attachEvent){ window.attachEvent("onload",SG_load); } else{ window.addEventListener("load",SG_load,true); }
