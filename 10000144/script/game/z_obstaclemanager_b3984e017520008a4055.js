/**
 * Created by Christiaan Duim on 30-9-13.
 */

"use strict";

function ObstacleManager(context, level, lanes, levelID)
{
	//Store constructor vars
	this.context = context;
	this.level = level;
	this.lanes = lanes;
	
	//Define methods
	this.getObstacleRow = getObstacleRow;
	
	var CENTER_LANE = 5;
	var obstacleDataManager = new ObstacleDataManager();
	var levelFinished = false;
	
	var levelObstacles;
		
	loadJSON("levels/level" + levelID + ".json" + cacheSuffix(), function(data){
		levelObstacles = serializeData(data.obstacles);
	});
	
	function serializeData(obstacles)
	{
		var result = [];
		
		for (var i = 0; i <  obstacles.length; i++)
		{
			var rowData = [];
			
			for (var j = 0; j <  obstacles[i].row.length; j++){
				rowData.push(obstacles[i].row[j]);
			}
			
			result.push(rowData);
		}
		
		return result;
	}
	
	//Return the next row with obstacles for the level
	function getObstacleRow()
	{
		if (levelFinished) return null;
		
		var rowData = getNextRow();
		var result = [];
		
		if (rowData == null){
			levelFinished = true;
			result.push(new Obstacle(this.context, this.lanes[CENTER_LANE], this.level, obstacleDataManager.getObstacleDataByType(OBSTACLE_TYPE_FINISH))); //, obstacleFrames[type]));
			return result;
		};
		
		//loop over obstacleData;
		for (var i = 0; i < rowData.length; i++)
        {
			var otype = rowData[i].obstacle;
			if (otype != null){
				result.push(new Obstacle(
						this.context, this.lanes[i + (CENTER_LANE - 1)],
						this.level, obstacleDataManager.getObstacleDataByType(otype), rowData[i].extra
				));
			}
        }
		
		return result;
	}
	
	function getNextRow()
    {
		if (levelObstacles.length > 0) {
			var result = levelObstacles[0];
		
			levelObstacles.splice(0, 1);
		
			return result;
		}else{
			return null;
		};
    };
}