/**
 * Created by JetBrains WebStorm.
 * User: jproulx
 * Date: 20/02/12
 * Time: 12:26 PM
 * To change this template use File | Settings | File Templates.
 */

var Line = Class.extend({
    init: function (point1, point2, slope, offset) {
        this.Point1 = point1;
        this.Point2 = point2;

        this.Slope = slope;
        this.Offset = offset;
    },
    getOffset:function (timestamp) {
        if (isNaN(this.Offset)) {
            var point1 = this.Point1.get(timestamp);

            return point1.Y - this.getSlope(timestamp) * point1.X;
        }
        return this.Offset;
    },
    getSlope:function (timestamp) {
        if (isNaN(this.Slope)) {
            var point1 = this.Point1.get(timestamp);
            var point2 = this.Point2.get(timestamp);

            return (point2.Y - point1.Y) /
                   (point2.X - point1.X);
        }

        return this.Slope;
    },
    getPoints:function (timestamp, point, length) {
        var points = new Array();

        if (this.getSlope(timestamp) != Infinity) {
            var angle = Math.atan(this.getSlope(timestamp));
            var y = point.Y + length * Math.sin(angle);
            var x = point.X + length * Math.cos(angle);
            points.push(new Point(x, y));

            var y = point.Y + -length * Math.sin(angle);
            var x = point.X + -length * Math.cos(angle);
            points.push(new Point(x, y));
        }
        else {
            var y = point.Y + length;
            var x = point.X;
            points.push(new Point(x, y));

            var y = point.Y - length;
            var x = point.X;
            points.push(new Point(x, y));
        }
        return points;
    },
    getPerpendicularLine:function (timestamp, point) {
        //Number.POSITIVE_INFINITY;

        var slope = Infinity;
        var offset = point.X;

        if (this.getSlope(timestamp) != 0) {
            slope = -1 / this.getSlope(timestamp);
            offset = -1 * slope * point.X + point.Y;
        }

        if (isNaN(slope) || isNaN(offset))
        {
            debugger;
        }

        return new Line(null, null, slope, offset);
    },
    getIntersectionPoint:function (timestamp, otherLine) {
        var x;
        var y;
        if (this.getSlope(timestamp) == Infinity) {
            x = this.getOffset(timestamp);
            y = otherLine.getSlope(timestamp) * x + otherLine.getOffset(timestamp);
        }
        else if (otherLine.getSlope(timestamp) == Infinity) {
            x = otherLine.getOffset(timestamp);
            y = this.getSlope(timestamp) * x + this.getOffset(timestamp);
        }
        else {
            x = (otherLine.getOffset(timestamp) - this.getOffset(timestamp)) / (this.getSlope(timestamp) - otherLine.getSlope(timestamp));
            y = this.getSlope(timestamp) * x + this.getOffset(timestamp);
        }
        return new Point(x, y);
    }
});

