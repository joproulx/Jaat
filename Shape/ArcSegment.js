/**
 * Created by JetBrains WebStorm.
 * User: jproulx
 * Date: 01/03/12
 * Time: 12:02 PM
 * To change this template use File | Settings | File Templates.
 */

var ArcSegment = Segment.extend({
    init: function(center)
    {
        //this.Center =

    },
    setJoints: function(joint1, joint2)
    {
        this.Joint1 = joint1;
        this.Joint2 = joint2;
        this.Line = new Line(slope,offset);


        //y = x₂² - x₁² + y₂² - y₁² - 2(x₂ - x₁)x)/2(y2 -y1)


    },
    createDrawnSegment: function()
    {
        return new ArcDrawnSegment(this);
    },
    slope : function()
    {
        return this.Line.Slope;
    },
    pointFromRatio: function(ratio)
    {
        return new Point((ratio*this.Joint2.Point.X + (1-ratio)*this.Joint1.Point.X), (ratio*this.Joint2.Point.Y + (1-ratio)*this.Joint1.Point.Y));
    },
    pointFromLength:  function(length)
    {
        return this.pointFromRatio(length / this.length());
    },
    length: function()
    {
        return Math.sqrt(Math.pow(this.Joint2.Point.Y - this.Joint1.Point.Y, 2) + Math.pow(this.Joint2.Point.X - this.Joint1.Point.X, 2));
    },
    getPerpendicularLine: function(point)
    {
        return this.Line.getPerpendicularLine(point);
    },
    getIntersectionPoint: function(otherLine)
    {
        return this.Line.getIntersectionPoint(otherLine);
    }


});

