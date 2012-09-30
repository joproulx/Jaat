define([
    'libs/ctor/ctor',
    'common/Point'],
    function (Ctor, Point) {
        var Line = Ctor(function () {
            this.init = function (point1, point2, slope, offset) {
                this.Point1 = point1;
                this.Point2 = point2;
                this.Slope = slope;
                this.Offset = offset;
            };
            this.getOffset = function (t) {
                if (isNaN(this.Offset)) {
                    var point1 = this.Point1.get(t);
                    return point1.Y - this.getSlope(t) * point1.X;
                }
                return this.Offset;
            };
            this.getSlope = function (t) {
                if (isNaN(this.Slope)) {
                    var point1 = this.Point1.get(t);
                    var point2 = this.Point2.get(t);
                    return (point2.Y - point1.Y) /
                           (point2.X - point1.X);
                }
                return this.Slope;
            };
            this.getPoints = function (t, point, length) {
                var points = [];
                var x, y;
                if (this.getSlope(t) != Infinity) {
                    var angle = Math.atan(this.getSlope(t));
                    y = point.Y + length * Math.sin(angle);
                    x = point.X + length * Math.cos(angle);
                    points.push(new Point(x, y));

                    y = point.Y + -length * Math.sin(angle);
                    x = point.X + -length * Math.cos(angle);
                    points.push(new Point(x, y));
                }
                else {
                    y = point.Y + length;
                    x = point.X;
                    points.push(new Point(x, y));

                    y = point.Y - length;
                    x = point.X;
                    points.push(new Point(x, y));
                }
                return points;
            };
            this.getPerpendicularLine = function (t, point) {
                var slope = Infinity;
                var offset = point.X;

                if (this.getSlope(t) != 0) {
                    slope = -1 / this.getSlope(t);
                    offset = -1 * slope * point.X + point.Y;
                }

                if (isNaN(slope) || isNaN(offset)) {
                    debugger;
                }

                return new Line(null, null, slope, offset);
            };
            this.getIntersectionPoint = function (t, otherLine) {
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
            };
        });
        return Line;
    });

