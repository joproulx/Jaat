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
    getOffset: function () {
        if (isNaN(this.Offset)) {
            return this.Point1.Y - this.getSlope() * this.Point1.X;
        }
        return this.Offset;
    },
    getSlope: function () {
        if (isNaN(this.Slope)) {
            return (this.Point2.Y - this.Point1.Y) / (this.Point2.X - this.Point1.X);
        }

        return this.Slope;
    },
    getPoints: function (point, length) {
        var points = new Array();

        if (this.getSlope() != Infinity) {
            var angle = Math.atan(this.getSlope());
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
    getPerpendicularLine: function (point) {
        //Number.POSITIVE_INFINITY;

        var slope = Infinity;
        var offset = point.X;

        if (this.getSlope() != 0) {
            slope = -1 / this.getSlope();
            offset = -1 * slope * point.X + point.Y;
        }

        return new Line(null, null, slope, offset);
    },
    getIntersectionPoint: function (otherLine) {
        var x;
        var y;
        if (this.getSlope() == Infinity) {
            x = this.getOffset();
            y = otherLine.getSlope() * x + otherLine.getOffset();
        }
        else if (otherLine.getSlope() == Infinity) {
            x = otherLine.getOffset();
            y = this.getSlope() * x + this.getOffset();
        }
        else {
            x = (otherLine.getOffset() - this.getOffset()) / (this.getSlope() - otherLine.getSlope());
            y = this.getSlope() * x + this.getOffset();
        }
        return new Point(x, y);
    }
});

