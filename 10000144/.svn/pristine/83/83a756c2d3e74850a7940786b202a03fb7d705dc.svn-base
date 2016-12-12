/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

var AVATAR_NORMAL = 1;
var AVATAR_HAPPY = 2;
var AVATAR_HIT = 3;
var AVATAR_DEAD= 4;
var AVATAR_HAPPY_FINISH = 5;

function Hud(context, level)
{
    //private vars
    var level = level;
    var context = context;
    
    var debugValue = "";
    
    this.update = update;
    this.setDebugValue = setDebugValue;
    this.setAvatar = setAvatar;
    
    var lastHighscoreAlpha = 1;
    var hideLastHighscore = false;
    
    var tutBg = loadImage("images/hud/tutorial/bg.png");
    var tutInstructImages = {
	    "jump.keyboard": loadImage("images/hud/tutorial/arrowup.png"),
	    "welcome.keyboard": loadImage("images/hud/tutorial/arrowleftright.png"),
	    "jump.touch": loadImage("images/hud/tutorial/touch.png")
    };
    tutInstructImages["welcome.touch"] = tutInstructImages["jump.touch"];
    
    var eggIcon = {img:loadImage("images/hud/eggs.png"), x:139, y:15, alpha:1, scale:1};
    var lifeIcon = {img:loadImage("images/hud/lives.png"), x:699, y:12, alpha:1, scale:1};
    var previousEggs = -1;
    var previousLifes = -1;

    var avatarRingImg = loadImage("images/hud/ring.png");
    var avatarImg = null;
    var avatarNormalImg = loadImage("images/hud/face-normal.png");
    var avatarHitFrames = [loadImage("images/hud/face-angry.png"), loadImage("images/hud/face-hit.png"), loadImage("images/hud/face-meh.png"), loadImage("images/hud/face-phew.png")];
    var avatarHappyImg = loadImage("images/hud/face-happy.png");
    var avatarDeadImg = loadImage("images/hud/face-dead.png");
    
    var avatarCounter = 0;
    var avatarCounterEnabled = false;
    var defaultAvatarImg = null;
    
    var shownTutorial = null;
    
    setAvatar(AVATAR_NORMAL);
    
    function setDebugValue(value){
        debugValue = value;
    }
    
    this.showTutorial = function showTutorial(which, onClose) {
    	
    	var langKey = "tutorial." + which;
    	var text = getLangString(langKey);
    	shownTutorial = {
    			key: which,
    			text: text,
    			instructions: getLangString(langKey + "." + inputType, null),
    			instructImage: tutInstructImages[which + "." + inputType]
    	};
    	setTimeout(function() {
    		shownTutorial = null;
    		onClose();
    	}, Math.max(4000, text.length * 50));
    };
    
    function flash(iconObject)
    {
    	TweenLite.to(iconObject, 0.15, {alpha:0, ease:Power2.easeIn, onComplete:function(){
    		TweenLite.to(iconObject, 0.15, {alpha:1, ease:Power2.easeIn, onComplete:function(){
    			TweenLite.to(iconObject, 0.15, {alpha:0, ease:Power2.easeIn, onComplete:function(){
    				TweenLite.to(iconObject, 0.15, {alpha:1, ease:Power2.easeIn, onComplete:function(){
    					
    				}});
    			}});
    		}});
    	}});
    }
    
    function grow(iconObject)
    {
    	TweenLite.to(iconObject, 0.10, {scale:1.25, ease:Power2.easeIn, onComplete:function(){
    		TweenLite.to(iconObject, 0.10, {scale:1, ease:Power2.easeIn, onComplete:function(){
    		}});
    	}});
    }
    
    function showChangeEggs(eggsAdded)
    {
    	if (eggsAdded){
    		grow(eggIcon);
    	}else{
    		flash(eggIcon);
    	}
    }

    function showChangeLifes(lifeAdded)
    {
    	if (lifeAdded){
    		setAvatar(AVATAR_HAPPY);
    		grow(lifeIcon);
    	}else{
    		setAvatar(AVATAR_HIT);
    		flash(lifeIcon);
    	}
    }
    
    function setAvatar(avatar)
    {
    	switch (avatar)
    	{
			case AVATAR_NORMAL:
				avatarImg = avatarNormalImg;
				avatarCounterEnabled = false;
				defaultAvatarImg = avatarNormalImg;
				break;
			case AVATAR_HAPPY:
				avatarImg = avatarHappyImg;
				avatarCounter = 50;
				avatarCounterEnabled = true;
				break;
			case AVATAR_HAPPY_FINISH:
				avatarImg = avatarHappyImg;
				avatarCounterEnabled = false;
				break;
			case AVATAR_HIT:
				avatarImg = getRandomArrayItem(avatarHitFrames);
				avatarCounter = 50;
				avatarCounterEnabled = true;
				break;
			case AVATAR_DEAD:
				avatarImg = avatarDeadImg;
				avatarCounterEnabled = false;
				defaultAvatarImg = avatarDeadImg;
				break;
    	}
    }
    
    function drawLastHighscore(currentDistance)
    {
    	if (!hideLastHighscore){
	    	var distanceToLastHighscore = (LAST_HIGHSCORE - currentDistance);
	    	if (distanceToLastHighscore < 0){
	    		distanceToLastHighscore = 0;
	    		lastHighscoreAlpha -= 0.05;
	    		if (lastHighscoreAlpha <= 0){
	    			hideLastHighscore = true;
	    		}
	    	}
    	}
    	
        if (!hideLastHighscore){
	        context.save();
	        context.globalAlpha = lastHighscoreAlpha;
	        context.lineWidth = 6;
	        context.strokeStyle = 'black';
	        context.textAlign = 'right';
	        context.fillStyle = "white";
	        context.strokeText("Last:", 400, 150);
	        context.fillText("Last:", 400, 150);
	        context.fillStyle = "yellow";
	        context.textAlign = 'left';
	        context.strokeText(distanceToLastHighscore, 405, 150);
	        context.fillText(distanceToLastHighscore, 405, 150);
	        context.restore();
        }
    }
    
    function drawEggs(numEggs)
    {
    	drawIcon(eggIcon, 0.5);
    	
        context.strokeText(numEggs, 180, 55);
        context.fillText(numEggs, 180, 55);
    }

    function drawLifes(numLifes)
    {
    	drawIcon(lifeIcon, 0.5);
    	
        context.strokeText("x" + numLifes, 757, 56);
        context.fillText("x" + numLifes, 757, 56);
    }
    
    function drawIcon(iconObject, scale)
    {
    	if (typeof scale === "undefined") scale = 1;
    	context.save();
        context.globalAlpha = iconObject.alpha;
        var baseWidth = iconObject.img.width*scale;
    	var baseHeight = iconObject.img.height*scale;
    	var width = baseWidth * iconObject.scale;
    	var height = baseHeight * iconObject.scale;
        context.drawImage(iconObject.img, iconObject.x + ((baseWidth-width) / 2), iconObject.y + ((baseHeight - height) / 2), width, height);
    	context.restore();
    }
    
    function drawAvatar()
    {
    	context.save();
    	context.scale(0.5,0.5);
    	context.drawImage(avatarImg, 0, 0);
    	context.drawImage(avatarRingImg, 0, 0);
    	context.restore();
    }
    
//    function drawScore(score)
//    {
//        context.strokeText(score, 423, 65);
//        context.fillText(score, 423, 65);
//        
//        context.textAlign = 'right';
//        context.fillStyle = "#06cdc2";  //Blue-ish
//        context.strokeText("TIME:", 418, 65);
//        context.fillText("TIME:", 418, 65);
//    }
    
    function drawTime(time)
    {
    	context.font = "bold " + 48 + 'px dimboregular';
        context.strokeText(time, 423, 65);
        context.fillText(time, 423, 65);
        
        context.textAlign = 'right';
        context.fillStyle = "#06cdc2";  //Blue-ish
        strokedText(context, getLangString("time").toUpperCase(), 418, 65);
    }
    
    function updateAvatarImg(){
    	if (avatarCounterEnabled){
    		avatarCounter--;
    		if (avatarCounter <= 0){
    			avatarCounterEnabled = false;
    			avatarImg = defaultAvatarImg;
    		}
    	}
    }
    
    function drawTutorial() {

    	var x = GAME_WIDTH/2;
    	var y = GAME_HEIGHT/2;
    	
    	context.fillStyle="rgba(0,0,0,0.5)";
    	context.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    	
    	context.save(); {
    		
    		context.translate(x,y);
    		context.scale(0.5,0.5);
    		
    		context.drawImage(tutBg, -tutBg.width/2-40, -tutBg.height/2-10);
    		
    		var fontSize = 44;
    		
    		var spacing = 12;
    		var lines = shownTutorial.text.split("\n");
    		var textHeight = (lines.length * fontSize) + ((lines.length-1) * spacing);
    		
    		context.font = fontSize + "pt dimboregular";
    		context.fillStyle = "black";
    		
    		var textY;
    		if (shownTutorial.instructions != null) {
    			textY = -100;
				
				var ii = shownTutorial.instructImage;
				context.drawImage(ii, -260-ii.width/2, 100-ii.height/2);
				
				var iLines = shownTutorial.instructions.split("\n");
    			var iHeight = (iLines.length * fontSize) + ((iLines.length-1) * spacing);
				
				context.textAlign = "left";
				for (var il = 0; il < iLines.length; il++) {
					var line = iLines[il];
					context.fillText(line, -120,
							100
							-(iHeight/2)
							+(fontSize*(il+1))
							+(spacing*il)
					);
				}
				
    		} else {
    			textY = 0;
    		}
	        
	        context.textAlign = "center";
    		for (var l = 0; l < lines.length; l++) {
    			var line = lines[l];
    			context.fillText(line, 0,
    					textY
    					-(textHeight/2)
    					+(fontSize*(l+1))
    					+(spacing*l)
    			);
    		}
		
    	} context.restore();
		
    }
    
    function update(eggs, lifes, score, distance, time)
    {    	
    	
    	if (shownTutorial != null) {
    		drawTutorial();
    	}
    	
    	distance = Math.round(distance);
    	lifes = lifes < 0? 0:lifes;
    	time = time < 0? 0:time;
    	time = secondsToTimeObject(Math.round(time / 1000));
//    	var timeText = time.minutes + ":" + (time.seconds < 10?"0" + time.seconds:time.seconds);
    	
        //Set default fill properties
    	context.font = "bold " + 36 + 'px dimboregular';
    	context.lineJoin = 'round';							//To prevent spikes when stroking text. Can also try: context.miterLimit = 2;
    	context.lineWidth = 6;
        context.strokeStyle = 'black';
        context.textAlign = 'left';
        context.fillStyle = "white";
        
        if (eggs != previousEggs)
        {
        	if (previousEggs != -1){
        		showChangeEggs(previousEggs < eggs);
        	}
        	previousEggs = eggs;
        }
        
        if (lifes != previousLifes)
        {
        	if (previousLifes != -1){
        		showChangeLifes(previousLifes < lifes);
        	}
        	previousLifes = lifes;
        }
        
        drawEggs(eggs);
        drawLifes(lifes);
        //drawScore(score);
//        drawTime(timeText);
        drawAvatar();
        
        updateAvatarImg();
        
        //drawLastHighscore(distance);
        
        if (SHOW_DEBUG_VALUE){
            context.fillText("debug: " + debugValue, 50, 250);
        }
    }
}