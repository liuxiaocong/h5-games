/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

function Lane(laneId, context)
{
    //Constants
    var DEFAULT_COLOR = "red";
    var LAST_DOT_COLOR = "white";

    //Private vars
    var context = context;
    var pointArray;

    //Methods
    this.createPoints = createPoints;
    this.setPerspective = setPerspective;
    this.getNextPosition = getNextPosition;
    this.getLinearPath = getLinearPath;
    this.draw = draw;
    this.getFactorBottom = getFactorBottom;

    //Public vars
    this.MAX_POSITIONS = 20;

    var DEFAULT_stepFactorTop = 25; //25
    var DEFAULT_stepFactorBottom = 250; //250
    var stepFactorTop = 0;
    var stepFactorBottom = 0; //120; // 410;     //350; //195;
    
    var CENTER_POINT = GAME_WIDTH / 2;
    //var UPPER_RIGHT_X = CENTER_POINT + (stepFactorTop * 4); //565 + (stepFactorTop * 1); //540;
    //var UPPER_LEFT_X = CENTER_POINT + (stepFactorTop * -4);//415 - (stepFactorTop * 1);//440;
    //var BOTTOM_RIGHT_X = CENTER_POINT + (stepFactorBottom * 4); //1075 + (stepFactorBottom * 1)//880;
    //var BOTTOM_LEFT_X = CENTER_POINT + (stepFactorBottom * -4); //-95 - (stepFactorBottom * 1)//100;

    this.laneId = laneId;
    this.perspectiveFactor = 0; //The difference in width between the road at the horizon and the road at the bottom of the screen
    
    this.setPerspective(DEFAULT_stepFactorTop, DEFAULT_stepFactorBottom);

    function setPerspective(factorTop, factorBottom)
    {
    	stepFactorTop = factorTop;
    	stepFactorBottom = factorBottom;

    	this.createPoints();
    }
    
    function getFactorBottom(){
    	return stepFactorBottom;
    }
    
    function createPoints()
    {
    	//Calculate the factor between te width of the top of the screen and the bottom. I.e the perspective
        this.perspectiveFactor = stepFactorBottom / stepFactorTop; //((BOTTOM_RIGHT_X - BOTTOM_LEFT_X) / (UPPER_RIGHT_X - UPPER_LEFT_X));
        //console.log("this.perspectiveFactor: " + this.perspectiveFactor)

        switch (this.laneId)
        {
            case 0:
                pointArray = this.getLinearPath(new Point(CENTER_POINT + (stepFactorTop * -12), HORIZON_Y), new Point(CENTER_POINT + (stepFactorBottom * -12), BOTTOM_Y));
                break;
            case 1:
                pointArray = this.getLinearPath(new Point(CENTER_POINT + (stepFactorTop * -8), HORIZON_Y), new Point(CENTER_POINT + (stepFactorBottom * -8), BOTTOM_Y));
                break;
            case 2:
                pointArray = this.getLinearPath(new Point(CENTER_POINT + (stepFactorTop * -4), HORIZON_Y), new Point(CENTER_POINT + (stepFactorBottom * -4), BOTTOM_Y));
                break;
            case 3:
                pointArray = this.getLinearPath(new Point(CENTER_POINT + (stepFactorTop * -2), HORIZON_Y), new Point(CENTER_POINT + (stepFactorBottom * -2), BOTTOM_Y));
                break;
            case 4:
                pointArray = this.getLinearPath(new Point(CENTER_POINT + (stepFactorTop * -1), HORIZON_Y), new Point(CENTER_POINT + (stepFactorBottom * -1), BOTTOM_Y));
                break;
            case 5:
                pointArray = this.getLinearPath(new Point(CENTER_POINT + (stepFactorTop * 0), HORIZON_Y), new Point(CENTER_POINT + (stepFactorBottom * 0), BOTTOM_Y));
                break;
            case 6:
                pointArray = this.getLinearPath(new Point(CENTER_POINT + (stepFactorTop * 1), HORIZON_Y), new Point(CENTER_POINT + (stepFactorBottom * 1), BOTTOM_Y));
                break;
            case 7:
                pointArray = this.getLinearPath(new Point(CENTER_POINT + (stepFactorTop * 2), HORIZON_Y), new Point(CENTER_POINT + (stepFactorBottom * 2), BOTTOM_Y));
                break;
            case 8:
                pointArray = this.getLinearPath(new Point(CENTER_POINT + (stepFactorTop * 4), HORIZON_Y), new Point(CENTER_POINT + (stepFactorBottom * 4), BOTTOM_Y));
                break;
            case 9:
                pointArray = this.getLinearPath(new Point(CENTER_POINT + (stepFactorTop * 8), HORIZON_Y), new Point(CENTER_POINT + (stepFactorBottom * 8), BOTTOM_Y));
                break;
            case 10:
                pointArray = this.getLinearPath(new Point(CENTER_POINT + (stepFactorTop * 12), HORIZON_Y), new Point(CENTER_POINT + (stepFactorBottom * 12), BOTTOM_Y));
                break;
        }
    }
    
    function getLinearPath(startPoint, endPoint)
    {
    	//TODO: find out where 5 is coming from
    	
        var results = new Array();
        var stepX = (((endPoint.x - startPoint.x) / this.MAX_POSITIONS) / 5);
        var stepY = (((endPoint.y - startPoint.y) / this.MAX_POSITIONS) / 5);

        for (var i = 0; i < this.MAX_POSITIONS; i++)
        {
        	
        	var currentPercentage = (i / (this.MAX_POSITIONS - 1));
        	//console.log("currentPercentage: " + currentPercentage);
        	var perspective = (this.perspectiveFactor - (this.perspectiveFactor * currentPercentage));
        	
        	//console.log("perspective: " + perspective);
        	//console.log("x: " + (startPoint.x + ((i * stepX) / perspective)) + " y: " + (startPoint.y + ((i * stepY) / perspective)));
        	
        	if (perspective == 0){        		
        		//console.log("endpoint: " + endPoint.x + " y: " + endPoint.y);
        		results.push(endPoint);
        	}else{
        		results.push(new Point(startPoint.x + ((i * stepX) / perspective), startPoint.y + ((i * stepY) / perspective)));
        	}
        }

        return results;
    }
    
    
//    function getLinearPath(startPoint, endPoint)
//    {
//        var results = new Array();
//        var stepX = (endPoint.x - startPoint.x) / this.MAX_POSITIONS;
//        var stepY = (endPoint.y - startPoint.y) / this.MAX_POSITIONS;
//
//        for (var i = 0; i < this.MAX_POSITIONS; i++)
//        {
//        	
//        	var currentPercentage = (i / (this.MAX_POSITIONS - 1));
//        	//console.log("currentPercentage: " + currentPercentage);
//        	var perspective = (this.perspectiveFactor - (this.perspectiveFactor * currentPercentage));
//        	
//        	//console.log("perspective: " + perspective);
//        	
//        	
//        	//if (perspective){}
//        	
//        	
//            results.push(new Point(startPoint.x + ((i * stepX) / perspective), startPoint.y + ((i * stepY) / perspective)));
//        }
//
//        return results;
//    }

    //Perspective Index is the current index but then exponentional to match the perspective
    // so  ......  becomes .    .   .  . ..
    function getNextPosition(perspectiveIndex)
    {
        if (perspectiveIndex > (this.MAX_POSITIONS - 1)){
        	//perspectiveIndex = (this.MAX_POSITIONS - 1);
            return null;
        }

        var firstIndex = Math.floor(perspectiveIndex);
        var firstPoint = pointArray[firstIndex];
        var lastPoint = pointArray[firstIndex + 1]; //Math.ceil(perspectiveIndex)];
        var factorBetweenPoints = perspectiveIndex - firstIndex;

//        if (firstPoint == null)
//        {
//        	console.log("perspectiveIndex: " + perspectiveIndex);
//        	console.log("firstIndex: " + firstIndex);
//        }
        
        return new Point(firstPoint.x + ((lastPoint.x - firstPoint.x) * factorBetweenPoints), firstPoint.y + ((lastPoint.y - firstPoint.y) * factorBetweenPoints));
    }

    function draw()
    {
    	context.fillStyle = DEFAULT_COLOR;

        var i = pointArray.length; //skip last point
        while(i--)
        {
        	context.fillRect(pointArray[i].x + level.calculateCurve(pointArray[i].y), pointArray[i].y, 2, 2);
        }
        
       // console.log("pointArray.length: " + pointArray.length);
       // console.log("pointArray[-1]: " + pointArray[pointArray.length - 1].x + " " +  pointArray[pointArray.length - 1].y);
        
        
        //Draw last point in different color
        var lastIndex = pointArray.length - 1;
        context.fillStyle = LAST_DOT_COLOR;
        context.fillRect(pointArray[lastIndex].x + level.calculateCurve(pointArray[lastIndex].y), pointArray[lastIndex].y, 10, 10);
    }
}
