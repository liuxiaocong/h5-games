var b2Vec2 = Box2D.Common.Math.b2Vec2,
	b2AABB = Box2D.Collision.b2AABB,
	b2BodyDef = Box2D.Dynamics.b2BodyDef,
	b2Body = Box2D.Dynamics.b2Body,
	b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	b2Fixture = Box2D.Dynamics.b2Fixture,
	b2World = Box2D.Dynamics.b2World,
	b2MassData = Box2D.Collision.Shapes.b2MassData,
	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
	b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
	b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef,
	b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
	b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
	b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef,
	b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef,
	b2GearJointDef = Box2D.Dynamics.Joints.b2GearJointDef,
	b2ContactListener = Box2D.Dynamics.b2ContactListener,
	b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
	b2DestructionListener = Box2D.Dynamics.b2DestructionListener;

var box2d =
{
	SCALE: 30,
	
	DEFAULT_DENSITY: 1.0,
	DEFAULT_RESTITUTION: 0.2,
	DEFAULT_FRICTION: 0.5,
	
	bodyType:
	{
		dynamic: b2Body.b2_dynamicBody,
		static:  b2Body.b2_staticBody,
		kinematic: b2Body.b2_kinematicBody
	},
	
	createWorld: function(gravity, allowSleep)
	{
		if(typeof gravity == "undefined") gravity = new b2Vec2(0, 10);
		if(typeof allowSleep == "undefined") allowSleep = true;
		
		return new b2World(gravity, allowSleep);
	},
	
	setDebugDraw: function(world, canvas)
	{
		var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(canvas.getContext("2d"));
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

		world.SetDebugDraw(debugDraw);
		box2d.setDebugDrawScale(world);
	},
	
	setDebugDrawScale: function(world)
	{
		if(world && world.m_debugDraw)
		{
			world.m_debugDraw.SetDrawScale(Utils.globalScale*box2d.SCALE);
		}
	},
	
	prepareBodyOptions: function(options)
	{
		if(typeof options != "object") options = {};
		
		options.x = (typeof options.x != "undefined") ? options.x : 0;
		options.y = (typeof options.y != "undefined") ? options.y : 0;
		options.rotation = (typeof options.rotation != "undefined") ? options.rotation : 0;
		options.bodyType = (typeof options.bodyType != "undefined") ? options.bodyType : box2d.bodyType.dynamic;
		options.density = (typeof options.density != "undefined") ? options.density : box2d.DEFAULT_DENSITY;
		options.restitution = (typeof options.restitution != "undefined") ? options.restitution : box2d.DEFAULT_RESTITUTION;
		options.friction = (typeof options.friction != "undefined") ? options.friction : box2d.DEFAULT_FRICTION;
		options.linearDamping = (typeof options.linearDamping != "undefined") ? options.linearDamping : 0;
		options.angularDamping = (typeof options.angularDamping != "undefined") ? options.angularDamping : 0;
		options.allowSleep = (typeof options.allowSleep != "undefined") ? options.allowSleep : true;
		options.isSleeping = (typeof options.isSleeping != "undefined") ? options.isSleeping : false;
		options.isBullet = (typeof options.isBullet != "undefined") ? options.isBullet : false;
		options.fixedRotation = (typeof options.fixedRotation != "undefined") ? options.fixedRotation : false;
		
		if(typeof options.filter == "undefined") options.filter = {};
		options.filter.categoryBits = (typeof options.filter.categoryBits != "undefined") ? options.filter.categoryBits : 1;
		options.filter.groupIndex = (typeof options.filter.groupIndex != "undefined") ? options.filter.groupIndex : 0;
		options.filter.maskBits = (typeof options.filter.maskBits != "undefined") ? options.filter.maskBits : 65535;
		
		options.isSensor = (typeof options.isSensor != "undefined") ? options.isSensor : false;
		
		return options;
	},
	
	fillFixtureDef: function(fixDef, options)
	{
		fixDef.density = options.density;
		fixDef.restitution = options.restitution;
		fixDef.friction = options.friction;
		
		fixDef.filter.categoryBits = options.filter.categoryBits;
		fixDef.filter.groupIndex = options.filter.groupIndex;
		fixDef.filter.maskBits = options.filter.maskBits;
		
		fixDef.isSensor = options.isSensor;
		
		return fixDef;
	},
	
	fillBodyDef: function(bodyDef, options)
	{
		bodyDef.type = options.bodyType;
		
		bodyDef.angle = options.rotation;
		bodyDef.position.Set(options.x/box2d.SCALE, options.y/box2d.SCALE);
		
		bodyDef.linearDamping = options.linearDamping;
		bodyDef.angularDamping = options.angularDamping;
		
		bodyDef.allowSleep = options.allowSleep;
		bodyDef.isSleeping = options.isSleeping;
		
		bodyDef.isBullet = options.isBullet;
		bodyDef.fixedRotation = options.fixedRotation;
		
		return bodyDef;
	},
	
	createCircle: function(world, options)
	{
		options = box2d.prepareBodyOptions(options);
		options.radius = (typeof options.radius != "undefined") ? options.radius : 10;
		
		var fixDef = box2d.fillFixtureDef(new b2FixtureDef(), options);
		var bodyDef = box2d.fillBodyDef(new b2BodyDef(), options);
		
		fixDef.shape = new b2CircleShape(options.radius/box2d.SCALE);
        
        var body = world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        
        body.SetBullet(options.isBullet);
        
        return body;
	},
	
	createBox: function(world, options)
	{
		options = box2d.prepareBodyOptions(options);
		options.width = (typeof options.width != "undefined") ? options.width : 20;
		options.height = (typeof options.height != "undefined") ? options.height : 20;
		
		var fixDef = box2d.fillFixtureDef(new b2FixtureDef(), options);
		var bodyDef = box2d.fillBodyDef(new b2BodyDef(), options);
		
		fixDef.shape = new b2PolygonShape();
		fixDef.shape.SetAsBox(options.width/box2d.SCALE/2, options.height/box2d.SCALE/2);
		
        var body = world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        
        body.SetBullet(options.isBullet);
        
        return body;
	},
	
	createPoly: function(world, options)
	{
		options = box2d.prepareBodyOptions(options);
		options.points = (typeof options.points != "undefined") ? options.points : [];
		
		var bodyDef = box2d.fillBodyDef(new b2BodyDef(), options);
		var body = world.CreateBody(bodyDef);
		
		var fixDef;
		for(var n=0; n<options.points.length; n++)
		{
			var p = options.points[n];
			
			fixDef = box2d.fillFixtureDef(new b2FixtureDef(), options);
			fixDef.shape = new b2PolygonShape();
			
			var vertices = [];
			for (var i=0; i < p.length; i++)
			{
				vertices.push(new b2Vec2(p[i][0]/box2d.SCALE, p[i][1]/box2d.SCALE));
			}
			
			fixDef.shape.SetAsVector(vertices, vertices.length);
	
			body.CreateFixture(fixDef);
		}
		
		body.SetBullet(options.isBullet);
		
		return body;
	},
	
	setBodyPosition: function(body, x, y)
	{
		var pos = body.GetPosition();
		
		if(typeof x == "undefined") x = pos.x*box2d.SCALE;
		if(typeof y == "undefined") y = pos.y*box2d.SCALE;
		
		body.SetPosition(new b2Vec2(x/box2d.SCALE, y/box2d.SCALE));
	},
	
	setBodyPositionAndRotation: function(body, x, y, rotation)
	{
		var pos = body.GetPosition();
		
		if(typeof x == "undefined") x = pos.x*box2d.SCALE;
		if(typeof y == "undefined") y = pos.y*box2d.SCALE;
		if(typeof rotation == "undefined") rotation = body.GetAngle();
		
		body.SetPositionAndAngle(new b2Vec2(x/box2d.SCALE, y/box2d.SCALE), rotation);
	},
	
	createDistanceJoint: function(world, options)
	{
		if(typeof options != "object") options = {};
		
		if(!options.body1 ||
		   !options.body2 ||
		   !options.point1 ||
		   !options.point2) return;
		
		options.collideConnected = (typeof options.collideConnected != "undefined") ? options.collideConnected : false;
		
		var jointDef = new b2DistanceJointDef();
		jointDef.Initialize(options.body1,
							options.body2,
							new b2Vec2(options.point1.x/box2d.SCALE, options.point1.y/box2d.SCALE),
							new b2Vec2(options.point2.x/box2d.SCALE, options.point2.y/box2d.SCALE));
		jointDef.collideConnected = options.collideConnected;
		
		return world.CreateJoint(jointDef);
	},
	
	createRevoluteJoint: function(world, options)
	{
		if(typeof options != "object") options = {};
		
		if(!options.body1 ||
		   !options.body2 ||
		   !options.point) return;
		
		options.collideConnected = (typeof options.collideConnected != "undefined") ? options.collideConnected : false;
		options.enableMotor = (typeof options.enableMotor != "undefined") ? options.enableMotor : false;
		options.motorSpeed = (typeof options.motorSpeed != "undefined") ? options.motorSpeed : 0;
		options.maxMotorTorque = (typeof options.maxMotorTorque != "undefined") ? options.maxMotorTorque : 0;
		options.enableLimit = (typeof options.enableLimit != "undefined") ? options.enableLimit : false;
		options.lowerAngle = (typeof options.lowerAngle != "undefined") ? options.lowerAngle : 0;
		options.upperAngle = (typeof options.upperAngle != "undefined") ? options.upperAngle : 0;
		
		var jointDef = new b2RevoluteJointDef();
		jointDef.Initialize(options.body1, options.body2, new b2Vec2(options.point.x/box2d.SCALE, options.point.y/box2d.SCALE));
		
		jointDef.collideConnected = options.collideConnected;
		jointDef.enableMotor = options.enableMotor;
		jointDef.motorSpeed = options.motorSpeed;
		jointDef.maxMotorTorque = options.maxMotorTorque;
		jointDef.enableLimit = options.enableLimit;
		jointDef.lowerAngle = options.lowerAngle;
		jointDef.upperAngle = options.upperAngle;
		
		var j = world.CreateJoint(jointDef);
		return j;
	},
	
	createPrismaticJoint: function(world, options)
	{
		if(typeof options != "object") options = {};
		
		if(!options.body1 ||
		   !options.body2 ||
		   !options.point ||
		   !options.axis) return;
		
		options.collideConnected = (typeof options.collideConnected != "undefined") ? options.collideConnected : false;
		options.lowerTranslation = (typeof options.lowerTranslation != "undefined") ? options.lowerTranslation : 0;
		options.upperTranslation = (typeof options.upperTranslation != "undefined") ? options.upperTranslation : 0;
		options.enableLimit = (typeof options.enableLimit != "undefined") ? options.enableLimit : false;
		options.motorForce = (typeof options.motorForce != "undefined") ? options.motorForce : 0;
		options.motorSpeed = (typeof options.motorSpeed != "undefined") ? options.motorSpeed : 0;
		options.enableMotor = (typeof options.enableMotor != "undefined") ? options.enableMotor : false;
		
		var jointDef = new b2PrismaticJointDef();
		jointDef.Initialize(options.body1,
							options.body2,
							new b2Vec2(options.point.x/box2d.SCALE, options.point.y/box2d.SCALE),
							new b2Vec2(options.axis.x/box2d.SCALE, options.axis.y/box2d.SCALE));
	
		jointDef.collideConnected = options.collideConnected;
		jointDef.lowerTranslation = options.lowerTranslation/box2d.SCALE;
		jointDef.upperTranslation = options.upperTranslation/box2d.SCALE;
		jointDef.enableLimit = options.enableLimit;
		jointDef.motorForce = options.motorForce;
		jointDef.motorSpeed = options.motorSpeed;
		jointDef.enableMotor = options.enableMotor;
		
		var j = world.CreateJoint(jointDef);
		return j;
	},
	
	createPulleyJoint: function(world, options)
	{
		if(typeof options != "object") options = {};
		
		if(!options.body1 ||
		   !options.body2 ||
		   !options.groundAnchor1 ||
		   !options.groundAnchor2 ||
		   !options.anchor1 ||
		   !options.anchor2) return;
		
		options.collideConnected = (typeof options.collideConnected != "undefined") ? options.collideConnected : false;
		options.ratio = (typeof options.ratio != "undefined") ? options.ratio : 1;
		options.maxLength1 = (typeof options.maxLength1 != "undefined") ? options.maxLength1 : 1;
		options.maxLength2 = (typeof options.maxLength2 != "undefined") ? options.maxLength2 : 1;
		
		var jointDef = new b2PulleyJointDef();
		jointDef.Initialize(options.body1,
							options.body2,
							new b2Vec2(options.groundAnchor1.x/box2d.SCALE, options.groundAnchor1.y/box2d.SCALE),
							new b2Vec2(options.groundAnchor2.x/box2d.SCALE, options.groundAnchor2.y/box2d.SCALE),
							new b2Vec2(options.anchor1.x/box2d.SCALE, options.anchor1.y/box2d.SCALE),
							new b2Vec2(options.anchor2.x/box2d.SCALE, options.anchor2.y/box2d.SCALE),
							options.ratio);
		
		jointDef.collideConnected = options.collideConnected;
		jointDef.maxLength1 = options.maxLength1/box2d.SCALE;
		jointDef.maxLength2 = options.maxLength2/box2d.SCALE;
		
		var j = world.CreateJoint(jointDef);
		return j;
	},
	
	createGearJoint: function(world, options)
	{
		if(typeof options != "object") options = {};
		
		if(!options.body1 ||
		   !options.body2 ||
		   !options.joint1 ||
		   !options.joint2) return;
		
		options.ratio = (typeof options.ratio != "undefined") ? options.ratio : 1;
		options.collideConnected = (typeof options.collideConnected != "undefined") ? options.collideConnected : false;
		
		var jointDef = new b2GearJointDef();
		
		jointDef.bodyA = options.body1;
		jointDef.bodyB = options.body2;
		jointDef.joint1 = options.joint1;
		jointDef.joint2 = options.joint2;
		jointDef.ratio = options.ratio;
		jointDef.collideConnected = options.collideConnected;
		
		var j = world.CreateJoint(jointDef);
		return j;
	},
	
	setContactsListener: function(world, options)
	{
		if(!options) options = {};
		
		var listener = new b2ContactListener();
		
		if(options.beginContact) listener.BeginContact = options.beginContact;
		if(options.endContact) listener.EndContact = options.endContact;
		if(options.preSolve) listener.PreSolve = options.preSolve;
		if(options.postSolve) listener.PostSolve = options.postSolve;
		
		world.SetContactListener(listener);
	},
	
	setContactFilter: function(world, options)
	{
		if(!options) options = {};
		
		var filter = new b2ContactFilter();
		
		if(options.shouldCollide) filter.ShouldCollide = options.shouldCollide;
		
		world.SetContactFilter(filter);
	},
	
	setDestructionListener: function(world, options)
	{
		if(!options) options = {};
		
		var listener = new b2DestructionListener();
		
		if(options.sayGoodbyeFixture) listener.SayGoodbyeFixture = options.sayGoodbyeFixture;
		if(options.sayGoodbyeJoint) listener.SayGoodbyeJoint = options.sayGoodbyeJoint;
		
		world.SetDestructionListener(listener);
	},
	
	rayCast: function(world, callback, point1, point2)
	{
		world.RayCast(callback, new b2Vec2(point1.x/box2d.SCALE, point1.y/box2d.SCALE), new b2Vec2(point2.x/box2d.SCALE, point2.y/box2d.SCALE));
	},
	
	syncStage: function(world)
	{
		var b = world.GetBodyList();
		var sprite, position;
		while(b)
		{
			sprite = b.GetUserData() || b.sprite;
			if(sprite)
			{
				position = b.GetPosition();
				sprite.x = position.x * box2d.SCALE;
				sprite.y = position.y * box2d.SCALE;
				sprite.rotation = b.GetAngle();
				
				sprite.dispatchEvent("box2dsync", {target: sprite});
			}
			
			b = b.GetNext();
		}
	},
	
	hitTest: function(b1, b2)
	{
		if(!b1 || !b2) return false;
		
		var c = b1.GetContactList();
		while(c)
		{
			if(c.contact.IsTouching() && c.other == b2) return true;
			c = c.next;
		}
		
		return false;
	}
};