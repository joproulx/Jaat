/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 23/02/12
 * Time: 8:48 PM
 * To change this template use File | Settings | File Templates.
 */
var ArcDrawnSegment = DrawnSegment.extend({
    init: function(arcSegment, isCorner)
    {
        this._super(isCorner);
        this.ArcSegment = arcSegment;

    },
    render : function(context)
    {

        var linePerpendicular1 = this.ArcSegment.Segment1.getPerpendicularLine(this.getPoint1());

        var linePerpendicular2 = this.ArcSegment.Segment2.getPerpendicularLine(this.getPoint2());

        var pointIntersect = linePerpendicular1.getIntersectionPoint(linePerpendicular2);

        var radius = pointIntersect.distanceFrom(this.getPoint1());

        var adjustedY1 = (this.getPoint1().Y - pointIntersect.Y);
        var adjustedX1 = (this.getPoint1().X - pointIntersect.X);

        var adjustedY2 = (this.getPoint2().Y - pointIntersect.Y);
        var adjustedX2 = (this.getPoint2().X - pointIntersect.X);

        var angle1 = Math.atan2(adjustedY1, adjustedX1);
        var angle2 = Math.atan2(adjustedY2, adjustedX2);

        var V1 = Vector.create([adjustedX1,-adjustedY1, 0]);
        var V2 = Vector.create([adjustedX2,-adjustedY2, 0]);

        var angle = V1.cross(V2);

        context.arc(pointIntersect.X,pointIntersect.Y,radius,angle1,angle2, (angle.elements[2] > 0));
    },

    getPoint1: function()
    {
        if (this.IsCorner)
        {
            return this.ArcSegment.Segment1.pointFromLength(this.ArcSegment.Segment1.length() - this.ArcSegment.CornerLength);
        }
        else
        {
            var point1 = this.LineSegment.Joint1.Point;
            if (this.DrawnSegment1 != null && this.DrawnSegment1.IsCorner)
            {
                point1 = this.DrawnSegment1.getPoint2();
            }
            return point1;
        }
    },
    getPoint2: function()
    {
        if (this.IsCorner)
        {
            return this.ArcSegment.Segment2.pointFromLength(this.ArcSegment.CornerLength);
        }
        else
        {


            var point2 = this.LineSegment.Joint2.Point;
            if (this.DrawnSegment2 != null && this.DrawnSegment2.IsCorner)
            {
                point2 = this.DrawnSegment2.getPoint1();
            }

            return point2;
        }

    }

});
