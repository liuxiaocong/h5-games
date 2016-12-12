/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

function ObstacleDataManager()
{
	var obstacleData = [];
	
	this.init = function()
	{
		obstacleData = this.serializeData(configData.obstacles);
	};
	
	this.getObstacleDataByType = function(type)
	{
		var i = obstacleData.length;
		while(i--)
		{
			if (obstacleData[i].type == type)
			{
				return obstacleData[i];
			}
		}
		
		return null;
	};
	
	this.serializeData = function(obstacles){
		
		var result = [];
		var collisionWidth = 0;
		var collisionHeight = 0;
		var score = 0;
		
		var i = obstacles.length;
		while(i--)
		{
			var imageData = [];
			
			var j = obstacles[i].imagedata.length;
			while(j--)
			{
				var id = obstacles[i].imagedata[j];
				var imgScale = id.hasOwnProperty("imgScale") ? id.imgScale : 1;
				imageData.push(new GameObjectImageData(loadImage(id.src), DEFAULT_BASE_SCALE * id.scalefactor, GO_FLIPSTYLE_NONE, imgScale));
	        }
			
			switch (obstacles[i].hitboxtype)
			{
				case OBSTACLE_HITBOX_TYPE_NARROW:
					collisionWidth = DEFAULT_COLLISION_WIDTH/2;
					collisionHeight = DEFAULT_COLLISION_HEIGHT;
					break;
				case OBSTACLE_HITBOX_TYPE_DEFAULT:
					collisionWidth = DEFAULT_COLLISION_WIDTH;
					collisionHeight = DEFAULT_COLLISION_HEIGHT;
					break;
				case OBSTACLE_HITBOX_TYPE_UNJUMPABLE:
					collisionWidth = DEFAULT_COLLISION_WIDTH;
					collisionHeight = UNJUMPABLE_COLLISION_HEIGHT;
					break;
				case OBSTACLE_HITBOX_TYPE_UNMISSABLE:
					collisionWidth = UNMISSABLE_COLLISION_WIDTH;
					collisionHeight = UNMISSABLE_COLLISION_HEIGHT;
			}
			
			switch (obstacles[i].scoretype)
			{
				case OBSTACLE_SCORE_OBSTACLE:
					score = SCORE_OBSTACLE;
		        	break;
		        case OBSTACLE_SCORE_EGG:
		        	score = SCORE_EGG;
		        	break;
		        case OBSTACLE_SCORE_LIFE:
		        	score = SCORE_LIFE;
		        	break;
			}
			
			result.push(new ObstacleData(obstacles[i].type, obstacles[i].name, imageData, collisionWidth, collisionHeight, score));
	    };
		
	    //console.log("Config loaded, obstacles found: " + result.length);
	    
		return result;
	};
	
	this.init();
};
