/**
 * Created by long on 14-2-5.
 */
var lg = lg || {};

var InputType = {
    press:"onPress",
    click:"onClick",
    move:"onMouseMove"
};

lg.InputManager = cc.Layer.extend({
    checkMouseMove:true,
    enabled:true,
    _callbacks:{},
    _ignoreChildren:[],
    _itemTouched:null,
    _doTouched:false,
    _inTouching:false,
    _targets:[],
    _tempResult:null,

    /**
     * @param{cc.Node}target the target want to receive the mouse/touch/keyboard input
     * @param{function}function to call back, func(touch, itemTouched), the scope is the TARGET itself in the function
     * @param{string}event type as InputType said
     * @param{Integer}priority the priority is bigger than the target will receive callback earlier
     * Note: if the target has _tilemap, the performance will be very good
     * Note: Pls call this in onEnter function and removeListener in onExit function
     * */
    addListener:function(target, func, type, priority)
    {
        if(target == null || func == null) return;
        type = (type == null) ? InputType.click : type;
        var arr = this._callbacks[type];
        if(arr == null){
            arr = [];
            this._callbacks[type] = arr;
        }
        arr.push({target:target,func:func});

        if(this._targets.indexOf(target) == -1) {
            this._targets.push(target);
            target.__input__priority = (priority === undefined) ? 0 : parseInt(priority);
        }
    },
    removeListener:function(target, func, type)
    {
        //remove all the callbacks for the target, if funcName == null
        var i = this._targets.indexOf(target);
        var exist = (i > -1);
        if(func == null && exist) {
            this._targets.splice(i, 1);
            delete target.__input__priority;
        }
        if(!exist) return;

        var arr = null;
        if(type != null){
            arr = this._callbacks[type];
            this._removeCallback(arr, target, func);
        }else{
            for(var t in InputType){
                arr = this._callbacks[InputType[t]];
                this._removeCallback(arr, target, func);
            }
        }
    },
    _removeCallback:function(calls, target, func)
    {
        if(calls == null) return;
        var i = -1;
        var call = null;
        while(++i < calls.length)
        {
            call = calls[i];
            if(call.target == target && (func == null || call.func == func)){
                calls.splice(i, 1);
                break;
            }
        }
    },
    onEnter:function()
    {
        this._super();

        if (sys.capabilities.hasOwnProperty('keyboard'))
        {
            this.setKeyboardEnabled(true);
        }
        if (sys.capabilities.hasOwnProperty('mouse'))
        {
            this.setMousePriority(-255);
            this.setMouseEnabled(true);
        }
        if (sys.capabilities.hasOwnProperty('touches'))
        {
            this.setTouchMode(cc.TOUCH_ONE_BY_ONE);
            this.setTouchPriority(-255);
            this.setTouchEnabled(true, true);
        }
    },
    onExit:function()
    {
        this._super();
        this._targets = [];
        this._ignoreChildren = [];
        this._callbacks = {};
    },
    findTouchedItem:function(touch)
    {
        if(!this.isVisible()) return null;
        this._targets.sort(this._sortTargets);
        return this._searchChildren(this._targets, touch);
    },
    _searchChildren:function(children, touch)
    {
        var child = null;
        var tileMap = null;
        var tiles = null;
        var pos = touch.getLocation();
        var i = children.length;
        while(--i >= 0){
            child = children[i];
            if(this.ifTargetIgnore(child)) continue;
            if(child._children.length > 0){
                //if child is a tiled layer, then use the high performance searching
                tileMap = child._tileMap;
                if(tileMap){
                    //todo, maybe should convert the space coordinate
                    tiles = tileMap.getObjects1(pos.x, pos.y);
                    if(tiles.length) {
                        this._doTouched = true;
                        //the last child would be the toppest child in zOrder
                        return tiles[tiles.length - 1];
                    }
                }
                this._tempResult = this._searchChildren(child._children, touch);
                if(this._tempResult) {
                    this._doTouched = true;
                    return this._tempResult;
                }
            }
            if(lg.ifTouched(child, touch)){
                this._doTouched = true;
                return child;
            }
        }
        return null;
    },
    ifTargetIgnore:function(child)
    {
        if(child == null) return true;
        if(!child.isRunning()) return true;
        if(!child.isVisible()) return true;
        if(!child.isRunning()) return true;
        if(!child._tileMap && child["isMouseEnabled"] && child.isMouseEnabled() === false) return true;
        var i = -1;
        var ignoreName = null;
        while(++i < this._ignoreChildren.length)
        {
            ignoreName = this._ignoreChildren[i];
            if(child.name == ignoreName) return true;
        }
        return false;
    },
    handleTouchBegan:function(pTouch)
    {
        if (!this.enabled || !this.isVisible()) {
            return false;
        }
        this._inTouching = true;
        this._doTouched = false;
        this._itemTouched = this.findTouchedItem(pTouch);
//        if (this._itemTouched && (this._itemTouched instanceof lg.SimpleButton)) {
//            cc.log("touch begin: "+this.name+", "+this.type);
//            this._setButtonState(this._itemTouched, ButtonState.DOWN);
//        }
        this._dispatch(pTouch, InputType.press);
//        cc.log("touch begin result: "+this.name+", "+this.type+", "+this._doTouched);
        return this._doTouched;
    },
    handleTouchEnded:function(pTouch)
    {
        if(!this.enabled || !this.isVisible()) return;
        this._inTouching = false;
//        cc.log("touch end: "+this.name+", "+this.type+", "+this._itemTouched);
        if(this._itemTouched)
        {
//            if(this._itemTouched instanceof lg.SimpleButton) {
//                var state = ButtonState.UP;
//                if(this._itemTouched.isSelectable() && !this._itemTouched.isSelected())
//                {
//                    state = ButtonState.SELECTED;
//                }
//                this._itemTouched.setState(state);
//            }
//            this._onItemClicked(pTouch);
        }
        this._dispatch(pTouch, InputType.click);
        this._itemTouched = null;
    },
    handleTouchMoved:function(pTouch)
    {
        if(!this.enabled || !this.isVisible()) return;
        if(!this.checkMouseMove) return;
        var touched = this.findTouchedItem(pTouch);
        if(touched != this._itemTouched) {
            if(this._itemTouched) {
//                if(this._itemTouched instanceof lg.SimpleButton) {
//                    var state = (this._itemTouched.isSelectable() && this._itemTouched.isSelected()) ? ButtonState.SELECTED : ButtonState.UP;
//                    this._itemTouched.setState(state);
//                }
                this._itemTouched = null;
            }

            if(touched) {
                this._itemTouched = touched;
//                cc.log("moved: "+this._inTouching+", "+Types.isSimpleButton(this._itemTouched)+", "+touched.name);
//                if(this._itemTouched instanceof lg.SimpleButton) {
//                    var state = this._inTouching ? ButtonState.DOWN : ButtonState.OVER;
//                    this._setButtonState(this._itemTouched, state);
//                }
            }
        }
        this._dispatch(pTouch, InputType.move);
    },
    handleToucheCanceled:function(touch, event)
    {
        this._inTouching = false;
        if(this._itemTouched)
        {
//            if(this._itemTouched instanceof lg.SimpleButton) {
//                var state = (this._itemTouched.isSelectable() && this._itemTouched.isSelected()) ? ButtonState.SELECTED : ButtonState.UP;
//                this._itemTouched.setState(state);
//            }
            this._itemTouched = null;
        }
    },
    _dispatch:function(touch, type)
    {
        if(!this._itemTouched || (this._itemTouched["isMouseEnabled"] && this._itemTouched.isMouseEnabled() === false)) return;

        var calls = this._callbacks[type];
        var call = null;
        var target = null;
        if(calls){
            var i = -1;
            var n = calls.length;
            while(++i < n)
            {
                call = calls[i];
                target = call.target;
                if(target.isVisible() && target.isRunning()
                    && (target == this._itemTouched || lg.isChildOf(this._itemTouched, target)))
                    call.func.apply(target, [touch, this._itemTouched]);
            }
        }
    },
    _setButtonState:function(button, state)
    {
        if(button.isSelectable() && button.isSelected())
        {
            state = "selected_"+state;
        }
        button.setState(state);
    },
    /**
     * Sort the targets ascending according its zOrder firstly and the __input_priority secondly
     * */
    _sortTargets:function(target1, target2)
    {
        if(target1.getZOrder() == target2.getZOrder())
        {
            return target1.__input__priority > target2.__input__priority ? 1 : -1;
        }else if(target1.getZOrder() > target2.getZOrder())
        {
            return 1;
        }else {
            return -1;
        }
    },
    onKeyDown:function(keycode)
    {
//        cc.KEY.w
    },
    onKeyUp:function(keycode)
    {

    },
    onTouchBegan:function(pTouch, pEvent)
    {
        return this.handleTouchBegan(pTouch);
    },
    onTouchEnded:function(pTouch, pEvent)
    {
        this.handleTouchEnded(pTouch);
    },
    onTouchMoved:function(pTouch, pEvent)
    {
        this.handleTouchMoved(pTouch);
    },
    onTouchCancelled:function(touch, event)
    {
        this.handleToucheCanceled(touch, event);
    },
    onMouseDown:function(mouse)
    {
        this.handleTouchBegan(mouse);
    },
    onMouseUp:function(mouse)
    {
        this.handleTouchEnded(mouse);
    },
    onMouseMoved:function(mouse)
    {
        this.handleTouchMoved(mouse);
    },
    onMouseDragged:function (mouse) {
        //todo
        return false;
    }
});

lg.InputManager.create = function()
{
    var layer = new lg.InputManager();
    layer.init();
    layer.checkMouseMove = true;
    return layer;
};