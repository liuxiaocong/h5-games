/**
 * Created by a on 14-2-19.
 */
RADIAN_TO_DEGREE = 180.0/Math.PI;
DEGREE_TO_RADIAN = Math.PI/180.0;

var LUtils = {};

LUtils.getAngle = function(startPoint, endPoint, forDegree)
{
    var dx = endPoint.x - startPoint.x;
    var dy = endPoint.y - startPoint.y;
    return LUtils.getAngle1(dx, dy, forDegree);
};
LUtils.getAngle1 = function(dx, dy, forDegree)
{
    var angle = Math.PI - Math.atan2(dx, dy);
    if(forDegree)
    {
        angle *= RADIAN_TO_DEGREE;
    }
    return angle;
};
var Arrow=cc.Sprite.extend({
    _tower1:null,
    _tower2:null,
    tower1position:null,
    init:function(fileName, rect)
    {
        this._super(fileName, rect);
    }
//    setStart:function(tower)
//    {
//        this._tower1 = tower;
//        this.tower1position = this._tower1.getPosition();
//        this.setPosition(cc.p(this.tower1position.x,this.tower1position.y-10));
//    }
});
Arrow.create = function(tower)
{
    var b = new Arrow();
    b.init(p_Arrow);
    return b;
};