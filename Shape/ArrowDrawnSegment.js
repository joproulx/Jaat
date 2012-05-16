/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 23/02/12
 * Time: 8:48 PM
 * To change this template use File | Settings | File Templates.
 */
var ArrowDrawnSegment = DrawnSegment.extend({
    init:function (arrowEndPoint) {
        this._super(true);
        this.IsIndependantShape = true;
        this.ArrowEndPoint = arrowEndPoint;
    },
    render:function (context, timestamp) {
        var linePerpendicular1 = this.ArrowEndPoint.Segment1.getPerpendicularLine(timestamp, this.getPoint1(timestamp));

        var points = new Array();
        points.push(this.ArrowEndPoint.Point.get());

        points = points.concat(linePerpendicular1.getPoints(timestamp, this.getPoint1(timestamp), this.ArrowEndPoint.ArrowWidth));


        context.stroke();
        context.save();
        context.lineWidth = 1;

        context.beginPath();

        var point = this.getPoint1(timestamp);
        context.moveTo(point.X, point.Y);

        context.lineTo(points[1].X, points[1].Y);
        context.lineTo(points[0].X, points[0].Y);
        context.lineTo(points[2].X, points[2].Y);
        context.lineTo(point.X, point.Y);
        context.fill();
        context.stroke();
        context.restore();
        context.beginPath();
        context.moveTo(point.X, point.Y);

    },
    getPoint1:function (timestamp) {
        if (this.IsCorner) {
            return this.ArrowEndPoint.Segment1.pointFromLength(timestamp, this.ArrowEndPoint.isStartEndPoint() ? this.ArrowEndPoint.ArrowLength :
                this.ArrowEndPoint.Segment1.length(timestamp) - this.ArrowEndPoint.ArrowLength);
        }
    },
    getPoint2:function (timestamp) {
        if (this.IsCorner) {
            return this.getPoint1(timestamp);
        }

    }

});
