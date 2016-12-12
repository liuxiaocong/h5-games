/**
 * @class
 * @augments Sprite
 * @description Класс для отрисовки джоинтов box2d
 * @param {b2World} world
 * @example
 * var drawer = new JointsDrawer(world);
 * drawer.zIndex = 0;
 * stage.addChild(drawer);
 * 
 * В случае, если у джоинта будет выставлено свойство sprite,
 * этот спрайт будет также синхронизироваться с джоинтом
 */
function JointsDrawer(world)
{
	Utils.callSuperConstructor(JointsDrawer, this, null, 1, 1);
	
	this.world = world;
	
	/** список джоинтов, которые не должны отрисовываться */
	this.ignoreList = [];
	
	/** цвет revolute-джоинтов */
	this.revoluteColor = "#ff0000";
	/** цвет distance-джоинтов */
	this.distanceColor = "#264f05";
	/** цвет prismatic-джоинтов */
	this.prismaticColor = "#FF00FF";
	
	/** минимальная длина джоинта, после которой он будет отрисован */
	this.minJointLength = 20;
	
	this.addEventListener("render", Utils.proxy(this.draw, this));
}

Utils.extend(JointsDrawer, Sprite);

/** @ignore */
JointsDrawer.prototype.draw = function()
{
	var ok = true;
	
	var world = this.world;
	var stage = this.stage;

	for (var j = world.GetJointList(); j; j = j.m_next)
	{
		var b1 = j.m_bodyA;
		var b2 = j.m_bodyB;
		var p1 = j.GetAnchorA();
		var p2 = j.GetAnchorB();
		
		if(this.ignoreList && this.ignoreList.indexOf(j) >= 0) continue;
		
		if(j.sprite)
		{
			j.sprite.x = p1.x;
			j.sprite.y = p1.y;
			continue;
		}
		
		if(j.m_type == Box2D.Dynamics.Joints.b2Joint.e_revoluteJoint)
		{
			stage.drawCircle(p1.x*box2d.SCALE, p1.y*box2d.SCALE, 1, 1, this.revoluteColor);
		}
		
		if(j.m_type == Box2D.Dynamics.Joints.b2Joint.e_distanceJoint)
		{
			var lx = p1.x - p2.x;
			var ly = p1.y - p2.y;
			var len = Math.sqrt(lx*lx + ly*ly);
			
			if(len >= this.minJointLength/box2d.SCALE)
			{
				stage.drawLine(p1.x*box2d.SCALE, p1.y*box2d.SCALE, p2.x*box2d.SCALE, p2.y*box2d.SCALE, 1, this.distanceColor);
			}
		}
	}
};