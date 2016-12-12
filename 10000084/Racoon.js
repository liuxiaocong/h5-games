/****************************************************
Racoon.js 1.1.0
CV Racoongames
@2014
****************************************************/

var Racoon_lastTimer;
var Racoon_rootNode;
function Racoon(){
	this.rootNode = Racoon_rootNode = (new RacoonRoot()).node();
	Racoon_lastTimer = (new Date()).getTime();
};
Racoon.prototype.Update = function(){
	var queue = [];
	queue.push(Racoon_rootNode);
	var currentTimer = (new Date()).getTime();
	var delta = (currentTimer - Racoon_lastTimer);//delta / (1000 / 60);
	Racoon_lastTimer = (new Date()).getTime();
	while (queue.length > 0) {
		var node = queue.shift();
		if (node.HasComponent()) {
			node.GetComponent().Update(delta);
		}
		var nextChild = node._firstChild;
		while (nextChild != null) {
			queue.push(nextChild);
			nextChild = nextChild._next;
		}
	}
	window.requestAnimationFrame(Racoon.prototype.Update);
};
Racoon.prototype.Start = function(){
	//must add first
	RTween.AddTween("RTweenGetVendorPrefix",["{top:0px;}","{top:0px;}"]);
	
	Racoon_lastTimer = (new Date()).getTime();
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
							   function(callback){ window.setTimeout(callback, 1000 / 60); };
	window.requestAnimationFrame = requestAnimationFrame;
    window.requestAnimationFrame(Racoon.prototype.Update);
	
};
Racoon.Extends = function(child, parent){
	for (var key in parent.prototype) {
		if (Object.prototype.hasOwnProperty.call(parent.prototype, key)) {
			if(key=="super") continue;
			child.prototype[key] = parent.prototype[key];
		}
	}
}
Racoon.CreateDOM = function(type){
	var dom = document.createElement(type);
	dom.style.position = "absolute";
	return dom;
}
Racoon.TimeStep = function(delta){
	return delta / (1000 / 60);
}
Racoon.TouchPosition = function(component, e){
	var x = 0, y = 0;
	if(Racoon.touchSupported){
		x = (e.touches[0].pageX - component.node().transform().x()) * (1 / component.node().transform().scaleX());
		y = (e.touches[0].pageY - component.node().transform().y()) * (1 / component.node().transform().scaleY());
	}else{
		x = (e.pageX - component.node().transform().x()) * (1 / component.node().transform().scaleX());
		y = (e.pageY - component.node().transform().y()) * (1 / component.node().transform().scaleY());
	}
	return {x:x, y:y};
}

Racoon.touchSupported = (function(){
	if(Util.GetDeviceType() == Util.DEVICE_DESKTOP){
		return false;
	}
	return true;  
})();
/**
	Class RComponent
*/
function RComponent(){
	this._node = new RNode(this);
	
};
RComponent.prototype.node = function() {
	return this._node;
};
RComponent.prototype.Dispose = function(){
	this._node.Dispose();
	this._node = null;
};
RComponent.prototype.Update = function(delta){
	/*if(this._node._parent == null){
		this._node._transform.Update(null);
	}else{
		//transform kyk e null
		//this._node._transform.Update(this._node._parent._transform);
		//this._node._transform.Update(this._node._parent._transform);
	}*/
	this._node._transform.Update(null);
};

/** Class RNode
*/
function RNode(component){
	this._component = component;
	this._next = null;
	this._prev = null;
	this._firstChild = null;
	this._lastChild = null;
	this._numChildren = 0;
	this._transform = new RTransform();
	this._parent = null;
};

RNode.prototype.parent = function() {
	return this._parent;
};
RNode.prototype.next = function() {
	return this._next;
};
RNode.prototype.prev = function() {
	return this._prev;
};
RNode.prototype.firstChild = function() {
	return this._firstChild;
};
RNode.prototype.lastChild = function() {
	return this._lastChild;
};
RNode.prototype.numChildren = function() {
	return this._numChildren;
};
RNode.prototype.transform = function() {
	return this._transform;
};
	
RNode.prototype.Dispose = function() {
	this._component = null;
};
RNode.prototype.AppendNode = function(node) {
	if (node._parent != null) throw "Hapus node dari parent terlebih dahulu";
	node._parent = this;
	if (this._firstChild == null) {
		this._firstChild = node;
		this._lastChild = node;
		this._numChildren++;
		return;
	}
	node._prev = this._lastChild;
	this._lastChild._next = node;
	this._lastChild = node;
	this._numChildren++;
};
RNode.prototype.PrependNode = function(node) {
	if (node._parent != null) throw "Hapus node dari parent terlebih dahulu";
	node._parent = this;
	if (this._firstChild == null) {
		this._firstChild = node;
		this._lastChild = node;
		this._numChildren++;
		return;
	}
	node._next = this._firstChild;
	this._firstChild._prev = node;
	this._firstChild = node;
	_numChildren++;
};
RNode.prototype.SwapNode = function(node1, node2) {
	if (node1._parent != this) throw "Node1 salah (mungkin salah parent?)";
	if (node2._parent != this) throw "Node2 salah (mungkin salah parent?)";
	
	var node1Next = node1._next;
	var node1Prev = node1._prev;
	var node2Next = node2._next;
	var node2Prev = node2._prev;
	
	if(node2Prev == node1){
		node2Prev = node2;
	}
	if(node2Next == node1){
		node2Next = node2;
	}
	if(node1Prev == node2){
		node1Prev = node1;
	}
	if(node1Next == node2){
		node1Next = node1;
	}
	
	if(node1Next!=null){
		node1Next._prev = node2;
	}
	if(node1Prev!=null){
		node1Prev._next = node2;
	}
	if(node2Next!=null){
		node2Next._prev = node1;
	}
	if(node2Prev!=null){
		node2Prev._next = node1;
	}
	
	node1._next = node2Next;
	node1._prev = node2Prev;
	
	node2._next = node1Next;
	node2._prev = node1Prev;
	
	if(node1._prev==null){
		this._firstChild = node1;
	}
	if(node1._next==null){
		this._lastChild = node1;
	}
	if(node2._prev==null){
		this._firstChild = node2;
	}
	if(node2._next==null){
		this._lastChild = node2;
	}
}
RNode.prototype.RemoveNode = function(node) {
	if (node._parent == this) {
		node._parent = null;
		var prevNode = node._prev;
		var nextNode = node._next;
		
		if (prevNode != null) {
			prevNode._next = nextNode;
		}
		if (nextNode != null) {
			nextNode._prev = prevNode;
		}
		if (node == this._firstChild) {
			this._firstChild = nextNode;
		}
		if (node == this._lastChild) {
			this._lastChild = prevNode;
		}
		this._numChildren--;
	}
};
RNode.prototype.HasComponent = function() {
	return this._component != null;
};
RNode.prototype.GetComponent = function() {
	return this._component;
};

/** Class RTransform
*/
function RTransform(){
	this._matrix = new RMatrix3D();
	this._transformationMatrix = new RMatrix3D();
	this._alpha = 1;
	this._x = 0;
	this._y = 0;
	this._pivotX = 0;
	this._pivotY = 0;
	this._rotation = 0;
	this._scaleX = 1;
	this._scaleY = 1;
	this._change = false;
};
RTransform.prototype.matrix = function() {
	return this._matrix;
};
RTransform.prototype.alpha = function(value) {
	if (value != null){
		this._alpha = value;
	}
	return this._alpha;
};

RTransform.prototype.x = function(value) {
	if (value != null){
		this._x = value;
		this._change = true;
	}
	return this._x;
};
RTransform.prototype.y = function(value) {
	if (value != null){
		this._y = value;
		this._change = true;
	}
	return this._y;
};
RTransform.prototype.pivotX = function(value) {
	if (value != null){
		this._pivotX = value;
		this._change = true;
	}
	return this._pivotX;
};
RTransform.prototype.pivotY = function(value) {
	if (value != null){
		this._pivotY = value;
		this._change = true;
	}
	return this._pivotY;
};
RTransform.prototype.rotation = function(value) {
	if (value != null){
		this._rotation = value;
		this._change = true;
	}
	return this._rotation;
};
RTransform.prototype.scaleX = function(value) {
	if (value != null){
		this._scaleX = value;
		this._change = true;
	}
	return this._scaleX;
};

RTransform.prototype.scaleY = function(value) {
	if (value != null){
		this._scaleY = value;
		this._change = true;
	}
	return this._scaleY;
};

RTransform.prototype.Update = function(parentTransform) {
	
	//this._matrix.Translate(this._x, this._y, 0);
	
	if(this._change){
		this._transformationMatrix.Identity();
		if (this._pivotX != 0 || this._pivotY != 0)
		this._transformationMatrix.Translate( this._pivotX, this._pivotY, 0);
		if (this._scaleX != 0 || this._scaleY != 0)
		this._transformationMatrix.Scale(this._scaleX, this._scaleY, 1);
		if (this._pivotX != 0 || this._pivotY != 0)
		this._transformationMatrix.Translate( -this._pivotX, -this._pivotY, 0);
		
		//this._matrix.Translate(this._x, this._y, 0);
		
		if (this._pivotX != 0 || this._pivotY != 0)
		this._transformationMatrix.Translate( -this._pivotX, -this._pivotY, 0);
		if (this._rotation != 0)
		this._transformationMatrix.Rotate(this._rotation, 0, 0, 1);
		if (this._pivotX != 0 || this._pivotY != 0)
		this._transformationMatrix.Translate( this._pivotX, this._pivotY, 0);
		this._change = false;
	}
	//this._matrix.Translate( -this._pivotX, -this._pivotY, 0);
	
	this._matrix.Identity();
	this._matrix.Translate(this._x-this._pivotX, this._y-this._pivotY, 0);
	this._matrix.Prepend(this._transformationMatrix);

	if (parentTransform != null)
	this._matrix.Prepend(parentTransform._matrix);
};
RTransform.prototype.ToCSS = function() {
	/*var a=this._matrix._data[0];
	var b=this._matrix._data[1];
	var c=this._matrix._data[4];
	var d=this._matrix._data[5];
	var tx=this._matrix._data[12];
	var ty=this._matrix._data[13];
	
	return "matrix("+a+","+b+","+c+","+d+","+tx+","+ty+")";//matrix3d("+this._matrix._data.join()+")";*/
	return "matrix3d("+this._matrix._data.join()+")";
};
/** Class RMatrix3D
*/
function RMatrix3D(){
	this._data = [1,0,0,0,
				  0,1,0,0,
				  0,0,1,0,
				  0,0,0,1];
};
RMatrix3D.prototype.Identity = function(){
	this._data = [1,0,0,0,
				  0,1,0,0,
				  0,0,1,0,
				  0,0,0,1];
};
RMatrix3D.prototype.Translate = function(x, y, z){
	var matrix = new RMatrix3D();
	matrix._data = [1,0,0,0,
				    0,1,0,0,
				    0,0,1,0,
				    x,y,z,1];
	this.Prepend(matrix);
};
RMatrix3D.prototype.Rotate = function(a, x, y, z){
	var matrix = new RMatrix3D();
	if(x==1){
		matrix._data = [1,0,0,0,
						0,Math.cos(a),-Math.sin(a),0,
						0,Math.sin(a),Math.cos( a),0,
						0,0,0,1];
	}else if(y==1){
		matrix._data = [Math.cos( a),0,Math.sin(a),0,
						0,1,0,0,
						-Math.sin(a),0,Math.cos(a),0,
						0,0,0,1];
	}else if(z==1){
		matrix._data = [Math.cos(a), -Math.sin(a), 0, 0,
					    Math.sin(a), Math.cos( a), 0, 0,
					    0,0,1,0,
					    0,0,0,1];
	}
	this.Prepend(matrix);
};
RMatrix3D.prototype.Scale = function(x, y, z){
	var matrix = new RMatrix3D();
	matrix._data = [x,0,0,0,
				    0,y,0,0,
				    0,0,z,0,
				    0,0,0,1];
	this.Prepend(matrix);
};
RMatrix3D.prototype.Prepend = function(matrix){
	var temp = new RMatrix3D();
	var _data = temp._data;

	_data[0] =this._data[0]*matrix._data[0] +this._data[4]*matrix._data[1] +this._data[8] *matrix._data[2] +this._data[12]*matrix._data[3];
	_data[1] =this._data[1]*matrix._data[0] +this._data[5]*matrix._data[1] +this._data[9] *matrix._data[2] +this._data[13]*matrix._data[3];
	_data[2] =this._data[2]*matrix._data[0] +this._data[6]*matrix._data[1] +this._data[10]*matrix._data[2] +this._data[14]*matrix._data[3];
	_data[3] =this._data[3]*matrix._data[0] +this._data[7]*matrix._data[1] +this._data[11]*matrix._data[2] +this._data[15]*matrix._data[3];
	_data[4] =this._data[0]*matrix._data[4] +this._data[4]*matrix._data[5] +this._data[8] *matrix._data[6] +this._data[12]*matrix._data[7];
	_data[5] =this._data[1]*matrix._data[4] +this._data[5]*matrix._data[5] +this._data[9] *matrix._data[6] +this._data[13]*matrix._data[7];
	_data[6] =this._data[2]*matrix._data[4] +this._data[6]*matrix._data[5] +this._data[10]*matrix._data[6] +this._data[14]*matrix._data[7];
	_data[7] =this._data[3]*matrix._data[4] +this._data[7]*matrix._data[5] +this._data[11]*matrix._data[6] +this._data[15]*matrix._data[7];
	_data[8] =this._data[0]*matrix._data[8] +this._data[4]*matrix._data[9] +this._data[8] *matrix._data[10]+this._data[12]*matrix._data[11];
	_data[9] =this._data[1]*matrix._data[8] +this._data[5]*matrix._data[9] +this._data[9] *matrix._data[10]+this._data[13]*matrix._data[11];
	_data[10]=this._data[2]*matrix._data[8] +this._data[6]*matrix._data[9] +this._data[10]*matrix._data[10]+this._data[14]*matrix._data[11];
	_data[11]=this._data[3]*matrix._data[8] +this._data[7]*matrix._data[9] +this._data[11]*matrix._data[10]+this._data[15]*matrix._data[11];
	_data[12]=this._data[0]*matrix._data[12]+this._data[4]*matrix._data[13]+this._data[8] *matrix._data[14]+this._data[12]*matrix._data[15];
	_data[13]=this._data[1]*matrix._data[12]+this._data[5]*matrix._data[13]+this._data[9] *matrix._data[14]+this._data[13]*matrix._data[15];
	_data[14]=this._data[2]*matrix._data[12]+this._data[6]*matrix._data[13]+this._data[10]*matrix._data[14]+this._data[14]*matrix._data[15];
	_data[15]=this._data[3]*matrix._data[12]+this._data[7]*matrix._data[13]+this._data[11]*matrix._data[14]+this._data[15]*matrix._data[15];
	
	this._data = _data;
};
RMatrix3D.prototype.Append = function(matrix){
	var temp = new RMatrix3D();
	var _data = temp._data;

	_data[0] =matrix._data[0]*this._data[0] +matrix._data[4]*this._data[1] +matrix._data[8] *this._data[2] +matrix._data[12]*this._data[3];
	_data[1] =matrix._data[1]*this._data[0] +matrix._data[5]*this._data[1] +matrix._data[9] *this._data[2] +matrix._data[13]*this._data[3];
	_data[2] =matrix._data[2]*this._data[0] +matrix._data[6]*this._data[1] +matrix._data[10]*this._data[2] +matrix._data[14]*this._data[3];
	_data[3] =matrix._data[3]*this._data[0] +matrix._data[7]*this._data[1] +matrix._data[11]*this._data[2] +matrix._data[15]*this._data[3];
	_data[4] =matrix._data[0]*this._data[4] +matrix._data[4]*this._data[5] +matrix._data[8] *this._data[6] +matrix._data[12]*this._data[7];
	_data[5] =matrix._data[1]*this._data[4] +matrix._data[5]*this._data[5] +matrix._data[9] *this._data[6] +matrix._data[13]*this._data[7];
	_data[6] =matrix._data[2]*this._data[4] +matrix._data[6]*this._data[5] +matrix._data[10]*this._data[6] +matrix._data[14]*this._data[7];
	_data[7] =matrix._data[3]*this._data[4] +matrix._data[7]*this._data[5] +matrix._data[11]*this._data[6] +matrix._data[15]*this._data[7];
	_data[8] =matrix._data[0]*this._data[8] +matrix._data[4]*this._data[9] +matrix._data[8] *this._data[10]+matrix._data[12]*this._data[11];
	_data[9] =matrix._data[1]*this._data[8] +matrix._data[5]*this._data[9] +matrix._data[9] *this._data[10]+matrix._data[13]*this._data[11];
	_data[10]=matrix._data[2]*this._data[8] +matrix._data[6]*this._data[9] +matrix._data[10]*this._data[10]+matrix._data[14]*this._data[11];
	_data[11]=matrix._data[3]*this._data[8] +matrix._data[7]*this._data[9] +matrix._data[11]*this._data[10]+matrix._data[15]*this._data[11];
	_data[12]=matrix._data[0]*this._data[12]+matrix._data[4]*this._data[13]+matrix._data[8] *this._data[14]+matrix._data[12]*this._data[15];
	_data[13]=matrix._data[1]*this._data[12]+matrix._data[5]*this._data[13]+matrix._data[9] *this._data[14]+matrix._data[13]*this._data[15];
	_data[14]=matrix._data[2]*this._data[12]+matrix._data[6]*this._data[13]+matrix._data[10]*this._data[14]+matrix._data[14]*this._data[15];
	_data[15]=matrix._data[3]*this._data[12]+matrix._data[7]*this._data[13]+matrix._data[11]*this._data[14]+matrix._data[15]*this._data[15];
	
	this._data = _data;
};
/**
	class RDOMNode
**/

Racoon.Extends(RDOMNode, RNode);
function RDOMNode(component){
	RNode.call(this, component);
}
RDOMNode.prototype.AppendNode = function(node){
	RNode.prototype.AppendNode.call(this, node);
	this.GetComponent()._base.appendChild(node.GetComponent()._base);
}
RDOMNode.prototype.PrependNode = function(node){
	RNode.prototype.PrependNode.call(this, node);
	if(this.GetComponent()._base.firstChild!=null){
		this.GetComponent()._base.insertBefore(node.GetComponent()._base, this.GetComponent()._base.firstChild);
	}else{
		this.GetComponent()._base.appendChild(node.GetComponent()._base);
	}
}
RDOMNode.prototype.SwapNode = function(node1,node2){
	RNode.prototype.SwapNode.call(this, node1, node2);
	var dummy1 = document.createElement("div");
	node1.GetComponent()._base.parentNode.insertBefore(dummy1, node1.GetComponent()._base);
	node1.GetComponent()._base.parentNode.insertBefore(node1.GetComponent()._base, node2.GetComponent()._base);
	node2.GetComponent()._base.parentNode.insertBefore(node2.GetComponent()._base, dummy1);
	node2.GetComponent()._base.parentNode.removeChild(dummy1);
}
RDOMNode.prototype.RemoveNode = function(node){
	RNode.prototype.RemoveNode.call(this, node);
	this.GetComponent()._base.removeChild(node.GetComponent()._base);
}
/**
	class RDOMComponent
**/
Racoon.Extends(RDOMComponent, RComponent);
function RDOMComponent(type){
	this._node = new RDOMNode(this);
	this._base = Racoon.CreateDOM(type);
	this._events = new REventDispatcher(this); //arrays of events
}
RDOMComponent.prototype.Update = function(delta){
	RComponent.prototype.Update.call(this, delta);
	var transform = this.node().transform().ToCSS();
	this._base.style.transform = transform;
	this._base.style.MozTransform = transform;
	this._base.style.WebkitTransform = transform;
	this._base.style.OTransform = transform;
	this._base.style.msTransform = transform;
}
RDOMComponent.prototype.base = function(){
	return this._base;
}
RDOMComponent.prototype.style = function(){
	return this._base.style;
}
RDOMComponent.prototype.events = function(){
	return this._events;
}
/**
	class REventDispatcher
**/
function REventDispatcher(owner){
	this._events = new Object();
	this._owner = owner;
}
REventDispatcher.prototype.AddEventListener = function(type, listener){
	if(this._events[type]==null){
		this._events[type] = [];
	}
	this._events[type].push(listener);
};
REventDispatcher.prototype.RemoveEventListener = function(type, listener){
	if(this._events[type]==null)return;
	var length = this._events[type].length;
	for(var i=0;i<length;i++){
		if(this._events[type][i] == listener){
			this._events[type].splice(i, 1);
		}
	}
};
REventDispatcher.prototype.DispatchEvent = function(event){
	if(this._events[event._type]==null) return;
	var length = this._events[event._type].length;
	for(var i=0;i<length;i++){
		this._events[event._type][i].call(this._owner, event);
	}
};
/**
	class REvent
**/
function REvent(type, target, data){
	this._type = type;
	this._target = target;
	this._data = data;
}
REvent.prototype.type = function(){
	return this._type;
};
REvent.prototype.target = function(){
	return this._target;
};
REvent.prototype.data = function(){
	return this._data;
};
REvent.COMPLETE = "COMPLETE";
REvent.FAILED = "FAILED";
REvent.TOUCH_BEGIN = "TOUCH_BEGIN";
REvent.TOUCH_MOVE = "TOUCH_MOVE";
REvent.TOUCH_END = "TOUCH_END";
REvent.TOUCH_OUT = "TOUCH_OUT";

/**
	class RacoonRoot
**/
Racoon.Extends(RacoonRoot, RDOMComponent);
function RacoonRoot(){
	RDOMComponent.call(this, "div");
	document.body.appendChild(this._base);
	this._base.style.overflow = "hidden";
	this._base.style.backgroundColor = "#000000";
	this._base.style.cursor = "default";
	this._base.style.userSelect = "none";
	this._base.style.webkitUserSelect = "none";
	this._base.style.MozUserSelect = "none";
}
RacoonRoot.prototype.Update = function(delta){
	RDOMComponent.prototype.Update.call(this, delta);
	this._base.style.width = window.innerWidth +"px";
	this._base.style.height = window.innerHeight+"px";
};
var isRendering=false;
RacoonRoot.Render = function(element){
	var n = document.createTextNode(' ');
    var disp = element.style.display;  // don't worry about previous display style

    element.appendChild(n);
    element.style.display = 'none';
	if (isRendering==false){
		isRendering=true;
		setTimeout(function(){
			element.style.display = disp;
			n.parentNode.removeChild(n);
			isRendering = false;
		},600);
	}
	/*var lure = new RDOMComponent("div");
	lure.base().style.backgroundColor = "rgba(0,0,0,0.1)";
	lure.base().style.width = "1000px";
	lure.base().style.height = "1000px";
	
	 var disp = element.style.display; 

    element.appendChild(lure.base());
    element.style.display = 'none';

    setTimeout(function(){
        element.style.display = disp;
        element.removeChild(lure.base());
    },20);*/
};
/**
	class RImage
**/
Racoon.Extends(RImage, RDOMComponent);
//function RImage(base){
function RImage(base){
	RDOMComponent.call(this, "img");
	if(base!=null){
		this._base = base;
	}
}
RImage.prototype.Load = function(url){
	var events = this._events;
	var target = this;
	this._base.onload = function(){
		events.DispatchEvent(new REvent(REvent.COMPLETE, target, url));
	}
	this._base.onerror = function(){
		var e = new REvent(REvent.FAILED, target, url);
		events.DispatchEvent(e);
	}
	this._base.src = url;
};
/**
	class RTouchable
**/

Racoon.Extends(RTouchable, RDOMComponent);
function RTouchable(type){
	RDOMComponent.call(this, type);
	var events = this._events;
	if(Racoon.touchSupported){
		this._base.ontouchstart = function(e){
			events.DispatchEvent(new REvent(REvent.TOUCH_BEGIN, events._owner, Racoon.TouchPosition(events._owner,e)));
		};
		this._base.ontouchmove = function(e){
			events.DispatchEvent(new REvent(REvent.TOUCH_MOVE, events._owner, Racoon.TouchPosition(events._owner,e)));
			e.preventDefault();
		};
		this._base.ontouchend = function(e){
			events.DispatchEvent(new REvent(REvent.TOUCH_END, events._owner, {}));
		};
		this._base.ontouchout = function(e){
			events.DispatchEvent(new REvent(REvent.TOUCH_OUT, events._owner, Racoon.TouchPosition(events._owner,e)));
		};
	}else{
		this._base.onmousedown = function(e){
			events.DispatchEvent(new REvent(REvent.TOUCH_BEGIN, events._owner, Racoon.TouchPosition(events._owner,e)));
		};
		this._base.onmousemove = function(e){
			events.DispatchEvent(new REvent(REvent.TOUCH_MOVE, events._owner, Racoon.TouchPosition(events._owner,e)));
		};
		this._base.onmouseup = function(e){
			events.DispatchEvent(new REvent(REvent.TOUCH_END, events._owner, Racoon.TouchPosition(events._owner,e)));
		};
		this._base.onmouseout = function(e){
			events.DispatchEvent(new REvent(REvent.TOUCH_OUT, events._owner, Racoon.TouchPosition(events._owner,e)));
		};
	}
}
/**
	class RSimpleButton
**/
Racoon.Extends(RSimpleButton, RTouchable);
function RSimpleButton(upState, downState){
	RTouchable.call(this, "div");
	var _upState = upState;
	var _downState = downState;
	this._node.AppendNode(_upState.node());
	this._node.AppendNode(_downState.node());
	_downState._base.style.display="none";
	this._events.AddEventListener(REvent.TOUCH_BEGIN, function(event){
		_upState._base.style.display="none";
		_downState._base.style.display="";
	});
	this._events.AddEventListener(REvent.TOUCH_END, function(event){
		_upState._base.style.display="";
		_downState._base.style.display="none";
	});
	this._events.AddEventListener(REvent.TOUCH_OUT, function(event){
		_upState._base.style.display="";
		_downState._base.style.display="none";
	});
}
/**
	class RBitmap
**/
Racoon.Extends(RBitmap, RTouchable);
function RBitmap(image){ //RImage
	RTouchable.call(this, "canvas");
	this._context2d = this._base.getContext('2d');
	this.bitmapData(image);
};
RBitmap.prototype.bitmapData = function(value){
	if(this._bitmapData == value) return value;
	if(value === undefined){
		return this._bitmapData;
	}else{
		
		if(value != null){
			this._base.width = value._base.width;
			this._base.height = value._base.height;
			this._context2d.drawImage(value._base, 0, 0);
		}else{
			this._context2d.clearRect(0,0,this._base.width,this._base.height);
		}
	}
	return this._bitmapData = value;
};

/**
	class RAnimation
**/
function RAnimation(){
	this._animations = new Object();
	this._loop = false;
	this._frames= [];
	this._isPlaying = false;
	this._currentFrame = 0;
	this._currentLabel = 0;
	this._frameInterval = 0;
	this._frameDuration = 0;
}
RAnimation.prototype.currentLabel = function(){
	return this._currentLabel
};
RAnimation.prototype.currentFrame = function(){
	return this._currentFrame;
};
RAnimation.prototype.totalFrames = function(){
	return this._frames.length;
};
RAnimation.prototype.AddAnimation = function(label, frames, duration){ // in ms
	this._animations[label] = {frames:frames, duration:duration};
};
RAnimation.prototype.Play = function(label, loop){
	this.GotoAndPlay(label, 1, loop);
}
RAnimation.prototype.GotoAndPlay = function(label, frame, loop){
	if(this._animations[label] == null) throw "Animation not found";
	this._isPlaying = true;
	this._loop = loop;
	this._currentLabel = label;
	this._currentFrame = frame;
	this._frames = this._animations[label].frames;
	this._frameDuration = this._animations[label].duration;
	this._frameInterval = 0;
};
RAnimation.prototype.GotoAndStop = function(label, frame){
	this.GotoAndPlay(label, frame);
	this._isPlaying = false;
};
RAnimation.prototype.GetIndex = function(){
	if(this._frames.length == 0) return 0;
	return this._frames[this._currentFrame-1]-1;
}
RAnimation.prototype.Update = function(delta){
	if(this._currentLabel != "" && this._isPlaying){
		this._frameInterval += delta;
		if (this._frameInterval >= this._frameDuration) {
			if(this._loop){
				this._frameInterval  = this._frameInterval % this._frameDuration;
			}else {
				this._frameInterval = this._frameDuration - 1;
			}
		}
		this._currentFrame = Math.floor(1 + (this._frameInterval / this._frameDuration) * this._frames.length);
	}
};

/**
	class RBitmapSequence
**/
Racoon.Extends(RBitmapSequence, RBitmap);
function RBitmapSequence(images){
	RBitmap.call(this, images[0]);
	this._animation = new RAnimation();
	this._animation.AddAnimation("RBitmapSequence_default", [1],1);
	this._animation.GotoAndStop("RBitmapSequence_default", 1);
	this._images = images;
}
RBitmapSequence.prototype.animation = function(){
	return this._animation;
};
RBitmapSequence.prototype.Update = function(delta){
	RBitmap.prototype.Update.call(this, delta);
	this.bitmapData(this._images[this._animation.GetIndex()]);
	this._animation.Update(delta);
};
/**
	class RTween
**/
function RTween(){
	
}
RTween._tweenCache = new Object();
RTween._vendorIndex = -1;
RTween.GetVendorPrefix = function(index){
	if(RTween._vendorIndex!=-1 && index==null){
		index = RTween._vendorIndex;
	}
	if (index==0){
		return "-webkit-";
	}else if(index==1){
		return "-moz-";
	}else if(index==2){
		return "-o-";
	}else if(index==3){
		return "-ms-";
	}
	return "";
};
RTween.HasTween = function(name){
	return RTween._tweenCache[name] == 1;
};
RTween.AddTween = function(name, keyframes){
	if(keyframes.length==1) {
		throw "Keyframe number must be 2 or more";
	}
	if(RTween.HasTween(name)){
		throw "Keyframe " + name + " exists";
	}
	var keyFrameRange = Math.floor(100 / (keyframes.length-1));
	var ruleString = "";
	ruleString+= name+" {";
	for (var i=0;i<keyframes.length;i++){
		ruleString+=" " + (i * keyFrameRange)+"% " + keyframes[i];
	}
	ruleString+="}";
	
	var lastSheet = document.styleSheets[document.styleSheets.length - 1];
	var rule="";
	
	var i=0;
	var success=false;
	while(!success && i<5){
		var prefix = RTween.GetVendorPrefix(i);
		try{
			rule = "@"+prefix+"keyframes " + ruleString;
			rule = rule.toString().replace(/-prefix-/g, prefix);
			lastSheet.insertRule(rule, lastSheet.cssRules.length);
			success=true;
			RTween._vendorIndex = i;
			RTween._tweenCache[name] = 1;
			break;
		}catch(e){
			console.log(prefix + " " + e);
			success=false;
		}
		i++;
	}
	if(!success){
		console.log("Animation failed");
	}
};
RTween.Tween = function(target, name, time, loopCount, options){
	var style = name + " " + (time/1000) + "s " + (loopCount==-1?"infinite ":loopCount + " ") + (options==null?"":options.join(" "));
	target.style().webkitAnimation = style;
    target.style().MozAnimation = style;
	target.style().msAnimation = style;   
    target.style().OAnimation = style;
    target.style().animation = style;
	if(loopCount!=-1){
		setTimeout(function(){
			target.style().webkitAnimation = "";
			target.style().MozAnimation = "";
			target.style().msAnimation = "";   
			target.style().OAnimation = "";
			target.style().animation = "";
		}, time);
	}
};
RTween.SimpleTween = function(target, from, to, time, loopCount, options){
	var key = "RTweenCache_"+from.x+"_"+from.y+"_"+to.x+"_"+to.y;
	if(RTween._tweenCache[key]==undefined){
		RTween.AddTween(key, ["{"+RTween.GetVendorPrefix()+"transform:translate("+from.x+"px,"+from.y+"px);}",
							  "{"+RTween.GetVendorPrefix()+"transform:translate("+to.x+"px,"+to.y+"px);}"]);
		RTween._tweenCache[key] = 1;
	}
	RTween.Tween(target, key, time, loopCount, options);
};

/**
	class RBlit
**/
Racoon.Extends(RBlit, RTouchable);
function RBlit(width, height){
	RTouchable.call(this, "canvas");
	this._base.width = width;
	this._base.height = height;
	this._context = this._base.getContext('2d');
}
RBlit.prototype.context = function(){
	return this._context;
};
//for android bug workaround
RBlit.prototype.Refresh = function(){
	if(this._base.style.marginRight != "1px"){
		this._base.style.marginRight = "1px";
	}else{
		this._base.style.marginRight = "0px";
	}
};
RBlit.prototype.Update = function(delta){
	RTouchable.prototype.Update.call(this, delta);
};
