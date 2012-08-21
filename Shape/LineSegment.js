var LineSegment = Segment.extend({
    init:function () {
    },
    createSegmentRenderer:function () {
        return new LineSegmentRenderer(this);
    },
    getSlope:function (t) {
        return this.Line.getSlope(t);
    },
    pointFromRatio:function (t, ratio) {
        var point1 =  this.Joint1.getPosition(t);
        var point2 =  this.Joint2.getPosition(t);

        return new Point((ratio * point2.X + (1 - ratio) * point1.X),
                         (ratio * point2.Y + (1 - ratio) * point1.Y));
    },
    tangentAngleFromRatio: function(t, ratio)
    {
        var point1 =  this.Joint1.getPosition(t);
        var point2 =  this.Joint2.getPosition(t);

        return Math.atan2(point2.Y - point1.Y, point2.X - point1.X);
    },
    pointFromLength:function (t, length) {
        return this.pointFromRatio(t, length / this.length(t));
    },
    length:function (t) {
        var point1 =  this.Joint1.getPosition(t);
        var point2 =  this.Joint2.getPosition(t);

        return Math.sqrt(Math.pow(point2.Y - point1.Y, 2) +
                         Math.pow(point2.X - point1.X, 2));
    },
    getPerpendicularLine:function (t, point) {
        return this.Line.getPerpendicularLine(t, point);
    },
    getIntersectionPoint:function (t, otherLine) {
        return this.Line.getIntersectionPoint(t, otherLine);
    }


});


