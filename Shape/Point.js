/**
 * Created by JetBrains WebStorm.
 * User: jproulx
 * Date: 20/02/12
 * Time: 12:15 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 08/02/12
 * Time: 12:22 AM
 * To change this template use File | Settings | File Templates.
 */
function Point(x, y) {
    this.X = x;
    this.Y = y;

    this.copy = function (copyValue) {
        this.X = copyValue.X;
        this.Y = copyValue.Y;
    }

    this.clone = function () {
        var newPoint = new Point();
        newPoint.copy(this);
        return newPoint;
    }

    this.distanceFrom = function (otherPoint) {
        return Math.sqrt(Math.pow(otherPoint.Y - this.Y, 2) + Math.pow(otherPoint.X - this.X, 2));
    }

    this.minus = function (otherPoint) {
        return new Point(this.X - otherPoint.X, this.Y - otherPoint.Y);
    }
    this.equals = function (other) {
        return other.X == this.X && other.Y == this.Y;
    }
    this.toString = function () {
        return this.X + ", " + this.Y;
    }
    this.multiplyBy = function (value) {
        return new Point(this.X * value, this.Y * value);
    }
    this.add = function (point) {
        return new Point(this.X + point.X, this.Y + point.Y);
    }
}
;