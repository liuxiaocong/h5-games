/**
 * Created by Christiaan Duim on 2-10-13.
 */

"use strict";
var VERSION = 1.4; 

//Global
var GAME_WIDTH = 800; 		
var GAME_HEIGHT = 480; 		
var HORIZON_Y = 150; 		
var BOTTOM_Y = 550; 		//480; //350; //700;   //800       GAME_HEIGHT + extra buffer ter grootte van de hoogste asset
var ROAD_HEIGHT = GAME_HEIGHT - HORIZON_Y;
var MAX_FPS = 60;           //The maximum FPS the game can reach
var MAX_SPF = 1000/MAX_FPS; //The maximum milliseconds per frame
var MIN_FPS = 15;           //The minimum FPS, below this number the game will not longer lower the speed, so things might get sluggish
var MIN_SPF = 1000/MIN_FPS; //The minimum milliseconds per frame          
var LAST_LEVEL = 1;
var ENABLE_PARALAX_SCROLLING = true;
var PARALAX_STRENGTH = 750; //950; //lower is more paralax effect
var APPLY_CURVES = true;
var SPEED_TO_METER = 2;
var LAST_HIGHSCORE = 100;
var LENGTH_OF_ROAD = 35; 	//Number of meter the visible road is long
var GOD_MODE = false;
var FULL_SCREEN = false;
var ENABLE_SOUND = true; 
var ENABLE_CHEATS = false; 

var CONFIG_PATH = "config.json";

var DEFAULT_BASE_SCALE = 0.25;

var EGG_DROP_OFF_ROAD = 1; 	//number of eggs you lose when being offroad for too long
var EGG_DROP_HIT = 5; 		//number of eggs you lose when being hit
var EGG_DROP_DEAD = 10; 	//number of eggs you lose when you die

//Debug
var SHOW_HITBOXES = false;
var DRAW_LANES = false;
var DRAW_REFERENCE_POINTS = false;
var DRAW_ROAD_LINES = false;
var SHOW_FPS = true;
var SHOW_DEBUG_VALUE = false;
////this.hud.setDebugValue("MOVELEFT")

//Gameplay:
var STARTING_HEALTH = 3;
var SPAWN_RATE_SAUCE = 20 * SPEED_TO_METER;
var SPAWN_RATE_BADGE = 1 * SPEED_TO_METER;
var SPAWN_RATE_BACKGROUND_OBJECT = 2 * SPEED_TO_METER;
var SPAWN_RATE_STREET_LIGHT = 7 * SPEED_TO_METER;
var SPAWN_RATE_OBSTACLE = 10 * SPEED_TO_METER;
var SPAWN_RATE_SIGN = 15 * SPEED_TO_METER;

//var OFF_ROAD_EGG_DROP_FACTOR = 15;  //Lower is more drops
//var SCORE_EGGS = 1;
var MAX_COIN_MULTIPLIER = 5;
var FAIL_TEXTS = ["Whoops!", "Snap!", "Watch it!", "Careful!", "Boom!", "Bump!"];

var SCORE_OBSTACLE = -250;
var SCORE_EGG = 50;
var SCORE_LIFE = 500;

var OBSTACLE_FADE_IN_PERCENTAGE = 0.005;

var STARTING_SPEED = 0.09; 		//0.05//10;
var MAX_SPEED = 0.11; 			//0.2
var COIN_MOVE_SPEED = 0.08; 	//Higher is faster

//Headstart
var HEADSTART_SPEED = 0.15;		
var HEADSTART_SLOWDOWN_POINT = 20;	 	//When this number of meters is left of the headstart, start to slowdown
var HEADSTART_FULLSPEED_POINT = 20;	//Number of meters that has to be reached for the headstart to be at full speed

//Collision
var SHOW_COLLISION_RECTANGLES = false;
var DEFAULT_COLLISION_WIDTH = 100;
var DEFAULT_COLLISION_HEIGHT = 75;
var UNJUMPABLE_COLLISION_HEIGHT = 300;
var UNMISSABLE_COLLISION_WIDTH = 400;
var UNMISSABLE_COLLISION_HEIGHT = 700;

