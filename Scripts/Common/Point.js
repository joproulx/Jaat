define([
    'libs/ctor/ctor'],
    function (Ctor) {
        var Point = Ctor(function () {
            this.init = function (x, y) {
                this.X = x;
                this.Y = y;
            };
            this.copy = function (copyValue) {
                this.X = copyValue.X;
                this.Y = copyValue.Y;
            };
            this.clone = function () {
                var newPoint = new Point();
                newPoint.copy(this);
                return newPoint;
            };
            this.distanceFrom = function (otherPoint) {
                return Math.sqrt(Math.pow(otherPoint.Y - this.Y, 2) + Math.pow(otherPoint.X - this.X, 2));
            };
            this.minus = function (otherPoint) {
                return new Point(this.X - otherPoint.X, this.Y - otherPoint.Y);
            };
            this.equals = function (other) {
                return other.X == this.X && other.Y == this.Y;
            };
            this.toString = function () {
                return this.X + ", " + this.Y;
            };
            this.multiplyBy = function (value) {
                return new Point(this.X * value, this.Y * value);
            };
            this.x = function (value) {
                return this.multiplyBy(value);
            };
            this.add = function (point) {
                return new Point(this.X + point.X, this.Y + point.Y);
            };
        });
        return Point;
    });