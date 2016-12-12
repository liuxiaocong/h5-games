/**
 * Created by a on 14-2-5.
 */
newArrow = cc.Sprite.extend({
    begin:null,
    end:null,
    size:null,
    thisMouse:null,
    init:function(){
        this._super();
        this.scheduleUpdate();
        this.initWithSpriteFrameName("arrow.png");
//        this.initWithImage("arrow.png");
////        this.createWithTexture("res/arrow.png");
        this.size = this.getContentSize();
        this.begin = this.getPosition();
    },
//    arrowWork:function(a,b){
//
//    },
    update:function(){
//        var mousePoint = (400,500);
        var mousePoint = this.thisMouse.getLocation();
        var dis = cc.pDistance(this.begin, mousePoint);
        var angle = LUtils.getAngle(this.begin, mousePoint,true);
        this.setScaleX(dis/this.size.width);
        this.setRotation(90 - angle);
    }
});
newArrow.create = function(){
    var arrow = new newArrow();
    arrow.init();
    return arrow;
}