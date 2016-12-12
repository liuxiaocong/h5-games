/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

var GO_FLIPSTYLE_NONE = 0;
var GO_FLIPSTYLE_SIDE = 1;
var GO_FLIPSTYLE_SIDEREVERSE = 2;
var GO_FLIPSTYLE_RANDOM = 3;

function GameObjectImageData(img, baseScale, flipStyle, imgScale, scaleVar)
{
	this.img = img;
	this.baseScale = baseScale;
	this.flipStyle = (typeof flipStyle === "undefined") ? GO_FLIPSTYLE_NONE : flipStyle;
	this.imgScale = (typeof imgScale === "undefined") ? 1 : imgScale;
	this.scaleVar = (typeof scaleVar === "undefined") ? 0 : scaleVar;
}