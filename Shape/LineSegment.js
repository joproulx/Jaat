
var LineSegment = Segment.extend({
    init: function()
    {
    },
    setJoints: function(joint1, joint2)
    {
        this.Joint1 = joint1;
        this.Joint2 = joint2;
        var slope = (this.Joint2.Point.Y - this.Joint1.Point.Y) / (this.Joint2.Point.X - this.Joint1.Point.X);
        var offset = this.Joint2.Point.Y - slope * this.Joint2.Point.X;
        this.Line = new Line(slope,offset);
    },
    copy: function(other)
    {
        this.Joint1 = other.Joint1.clone();
        this.Joint2 = other.Joint2.clone();
        this.Line = other.Line.clone();
    },
    clone: function()
    {
        var newObject = new LineSegment();
        newObject.copy(this);
        return newObject;
    },
    createDrawnSegment: function()
    {
        return new LineDrawnSegment(this);
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

