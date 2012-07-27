var LineSegment = Segment.extend({
    init:function () {
    },
    createDrawnSegment:function () {
        return new LineDrawnSegment(this);
    },
    getSlope:function (timestamp) {
        return this.Line.getSlope(timestamp);
    },
    pointFromRatio:function (timestamp, ratio) {
        var point1 =  this.Joint1.Point.get(timestamp);
        var point2 =  this.Joint2.Point.get(timestamp);

        return new Point((ratio * point2.X + (1 - ratio) * point1.X),
                         (ratio * point2.Y + (1 - ratio) * point1.Y));
    },
    pointFromLength:function (timestamp, length) {
        return this.pointFromRatio(timestamp, length / this.length(timestamp));
    },
    length:function (timestamp) {
        var point1 =  this.Joint1.Point.get(timestamp);
        var point2 =  this.Joint2.Point.get(timestamp);

        return Math.sqrt(Math.pow(point2.Y - point1.Y, 2) +
                         Math.pow(point2.X - point1.X, 2));
    },
    getPerpendicularLine:function (timestamp, point) {
        return this.Line.getPerpendicularLine(timestamp, point);
    },
    getIntersectionPoint:function (timestamp, otherLine) {
        return this.Line.getIntersectionPoint(timestamp, otherLine);
    }


});


