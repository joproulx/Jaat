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
    getOffset:function (t) {
        if (isNaN(this.Offset)) {
            var point1 = this.Point1.get(t);

            return point1.Y - this.getSlope(t) * point1.X;
        }
        return this.Offset;
    },
    getSlope:function (t) {
        if (isNaN(this.Slope)) {
            var point1 = this.Point1.get(t);
            var point2 = this.Point2.get(t);

            return (point2.Y - point1.Y) /
                   (point2.X - point1.X);
        }

        return this.Slope;
    },
    getPoints:function (t, point, length) {
        var points = new Array();

        if (this.getSlope(t) != Infinity) {
            var angle = Math.atan(this.getSlope(t));
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
    getPerpendicularLine:function (t, point) {
        //Number.POSITIVE_INFINITY;

        var slope = Infinity;
        var offset = point.X;

        if (this.getSlope(t) != 0) {
            slope = -1 / this.getSlope(t);
            offset = -1 * slope * point.X + point.Y;
        }

        if (isNaN(slope) || isNaN(offset))
        {
            debugger;
        }

        return new Line(null, null, slope, offset);
    },
    getIntersectionPoint:function (t, otherLine) {
        var x;
        var y;
        if (this.getSlope(t) == Infinity) {
            x = this.getOffset(t);
            y = otherLine.getSlope(t) * x + otherLine.getOffset(t);
        }
        else if (otherLine.getSlope(t) == Infinity) {
            x = otherLine.getOffset(t);
            y = this.getSlope(t) * x + this.getOffset(t);
        }
        else {
            x = (otherLine.getOffset(t) - this.getOffset(t)) / (this.getSlope(t) - otherLine.getSlope(t));
            y = this.getSlope(t) * x + this.getOffset(t);
        }
        return new Point(x, y);
    }
});

