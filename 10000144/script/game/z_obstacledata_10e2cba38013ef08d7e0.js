/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

var OBSTACLE_TYPE_PYLON1 = 1;
var OBSTACLE_TYPE_CAR = 2;
var OBSTACLE_TYPE_OIL = 3;
var OBSTACLE_TYPE_ROCK = 4;
var OBSTACLE_TYPE_LIFE = 5;
var OBSTACLE_TYPE_COIN = 6;
var OBSTACLE_TYPE_HOLE = 7;
var OBSTACLE_TYPE_FINISH = 8;
var OBSTACLE_TYPE_PYLON2 = 9;
var OBSTACLE_TYPE_PYLON3 = 10;

var OBSTACLE_TYPE_TRIGGER = 100;

var OBSTACLE_HITBOX_TYPE_NARROW = "narrow";
var OBSTACLE_HITBOX_TYPE_DEFAULT = "default";
var OBSTACLE_HITBOX_TYPE_UNJUMPABLE = "unjumpable";
var OBSTACLE_HITBOX_TYPE_UNMISSABLE = "unmissable";

var OBSTACLE_SCORE_OBSTACLE = "obstacle";
var OBSTACLE_SCORE_EGG = "egg";
var OBSTACLE_SCORE_LIFE = "life";

function ObstacleData(type, name, images, collisionWidth, collisionHeight, score)
{
	this.type = type;
	this.name = name;
	this.images = images;
	this.collisionWidth = collisionWidth;
	this.collisionHeight = collisionHeight;
	this.score = score;
	
	this.getRandomImage = function()
	{
		getRandomArrayItem(images);
	};
}

