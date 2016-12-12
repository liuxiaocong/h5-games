/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

var ROAD_SIDE_LEFT = 1;
var ROAD_SIDE_RIGHT = 0;
var ROAD_SIDE_CENTER = 0.5;

function BackgroundObjectManager(context, level, theme)
{
	
	//Store constructor vars
	this.context = context;
	this.level = level;
	
	//Define public methods
	this.getBackgroundObject = getBackgroundObject;
	
	//Local vars
	var families = [];
	var img = null;
	
	function oiu(obj) {
		return loadImage("images/bgObjects/" + obj + ".png");
	}
	
	//Object families
	var THORNS = [	{chance:1, data:new GameObjectImageData(oiu("doorn1"), DEFAULT_BASE_SCALE, GO_FLIPSTYLE_RANDOM)},
					{chance:1, data:new GameObjectImageData(oiu("doorn1-big"), DEFAULT_BASE_SCALE, GO_FLIPSTYLE_RANDOM)},
					{chance:1, data:new GameObjectImageData(oiu("doorn2"), DEFAULT_BASE_SCALE, GO_FLIPSTYLE_RANDOM)},
					{chance:1, data:new GameObjectImageData(oiu("doorn2-big"), DEFAULT_BASE_SCALE, GO_FLIPSTYLE_RANDOM)},
					{chance:1, data:new GameObjectImageData(oiu("doorn3"), DEFAULT_BASE_SCALE, GO_FLIPSTYLE_RANDOM)}];
	
	var TREES = [];
	for (var t = 1; t <= (theme == "desert" ? 5 : 4); t++) {
		TREES.push({chance:1, data:new GameObjectImageData(oiu(theme+"/boom" + t), DEFAULT_BASE_SCALE * (theme == "desert" ? 0.75 : 1.5) * 0.8, GO_FLIPSTYLE_RANDOM, 1, 0.4)});
	};
	
	var SHROOMS = [	{chance:1, data:new GameObjectImageData(oiu("paddo1"), DEFAULT_BASE_SCALE, GO_FLIPSTYLE_SIDEREVERSE)},
					{chance:1, data:new GameObjectImageData(oiu("paddo2"), DEFAULT_BASE_SCALE, GO_FLIPSTYLE_SIDEREVERSE)},
					{chance:1, data:new GameObjectImageData(oiu("paddo3"), DEFAULT_BASE_SCALE, GO_FLIPSTYLE_SIDEREVERSE)}];
	
	var SIDEMONSTERS = [{chance:1, data:new GameObjectImageData(oiu("sidemonster01"), DEFAULT_BASE_SCALE, GO_FLIPSTYLE_SIDE)},
	                    {chance:1, data:new GameObjectImageData(oiu("sidemonster02"), DEFAULT_BASE_SCALE, GO_FLIPSTYLE_SIDE)},
	                    {chance:1, data:new GameObjectImageData(oiu("sidemonster03"), DEFAULT_BASE_SCALE, GO_FLIPSTYLE_SIDE)},
						{chance:1, data:new GameObjectImageData(oiu("sidemonster04"), DEFAULT_BASE_SCALE, GO_FLIPSTYLE_SIDE)},
						{chance:1, data:new GameObjectImageData(oiu("sidemonster05"), DEFAULT_BASE_SCALE, GO_FLIPSTYLE_SIDE)}];
	
//	var ENEMIES_RIGHT = [{chance:1, data:new GameObjectImageData(loadImage("images/pixelkaiju-sidemonster01-right.png"), DEFAULT_BASE_SCALE)},
//	                    {chance:1, data:new GameObjectImageData(loadImage("images/pixelkaiju-sidemonster02-right.png"), DEFAULT_BASE_SCALE)},
//	                    {chance:1, data:new GameObjectImageData(loadImage("images/pixelkaiju-sidemonster03-right.png"), DEFAULT_BASE_SCALE)},
//						{chance:1, data:new GameObjectImageData(loadImage("images/pixelkaiju-sidemonster04-right.png"), DEFAULT_BASE_SCALE)},
//						{chance:1, data:new GameObjectImageData(loadImage("images/pixelkaiju-sidemonster05-right.png"), DEFAULT_BASE_SCALE)}];
	
	function getBackgroundObject(lane, side)
	{
		
		if (theme == "desert" && Math.random() > 0.2) return null;
		else if (Math.random() > 0.8) return null;
		
		//If lanes next to road
		if ((lane.laneId == 3) || (lane.laneId == 7))
        {
			//TODO: Design a better way to adjust the amount of spawning objects per lane/area
			if (getRandomInt(0,1)){
//				if (side == ROAD_SIDE_LEFT){
					families = [{objects:THORNS, chance:1}, {objects:SIDEMONSTERS, chance:1}];
					if (theme == "grass") families.push({objects:SHROOMS, chance:1});
//				}else{
//					families = [{objects:THORNS, chance:1}, {objects:SHROOMS, chance:1}, {objects:ENEMIES_LEFT, chance:1}];
//				}
			}else{
				return null;
			}
        }else{
        	families = [{objects:TREES, chance:1}]; 
        }

        var gameObjectData = getRandomObjectByChance(getRandomObjectByChance(families).objects).data;
		return new BackgroundObject(this.context, lane, this.level, side, gameObjectData);
	}
	
	function getRandomObjectByChance(objectArray)
	{
		var totalChanceArray = [];
		for (var i = 0; i < objectArray.length; i++){
			for (var j = 0; j < objectArray[i].chance; j++){
				totalChanceArray.push(objectArray[i]);
	        }
        }
		
		return objectArray[getRandomInt(0, totalChanceArray.length - 1)]; 
	}
}