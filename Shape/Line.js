/**
 * Created by JetBrains WebStorm.
 * User: jproulx
 * Date: 20/02/12
 * Time: 12:26 PM
 * To change this template use File | Settings | File Templates.
 */

function Line(slope, offset)
{

    this.Slope = slope;
    this.Offset = offset;

    this.getPoints = function(point, length)
    {
        var points = new Array();

        if (this.Slope != Infinity)
        {
            var angle = Math.atan(this.Slope);
            var y = point.Y + length * Math.sin(angle);
            var x = point.X + length * Math.cos(angle);
            points.push(new Point(x, y));

            var y = point.Y + -length * Math.sin(angle);
            var x = point.X + -length * Math.cos(angle);
            points.push(new Point(x, y));
        }
        else
        {
            var y = point.Y + length;
            var x = point.X ;
            points.push(new Point(x, y));

            var y = point.Y -length;
            var x = point.X;
            points.push(new Point(x, y));
        }
        return points;
    }

    this.getPerpendicularLine = function(point)
    {
        //Number.POSITIVE_INFINITY;

        var slope = Infinity;
        var offset = point.X;

        if (this.Slope != 0)
        {
            slope = -1/this.Slope;
            offset = -1 * slope * point.X + point.Y;
        }

        return new Line(slope, offset);
    }


    this.getIntersectionPoint = function(otherLine)
    {
        var x;
        var y;
        if (this.Slope == Infinity)
        {
            x = this.Offset;
            y = otherLine.Slope * x + otherLine.Offset;
        }
        else if (otherLine.Slope == Infinity)
        {
            x = otherLine.Offset;
            y = this.Slope * x + this.Offset;
        }
        else
        {
            x = (otherLine.Offset - this.Offset) / (this.Slope - otherLine.Slope);
            y = this.Slope * x + this.Offset;
        }
        return new Point(x, y);
    }
}

