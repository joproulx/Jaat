var BezierDrawnSegment = DrawnSegment.extend({
    init:function (bezierSegment) {
        this._super(false);
        this.BezierSegment = bezierSegment;
    },
    render:function (context, timestamp) {
        var point1 = this.BezierSegment.ControlPoint1.get(timestamp);
        var point2 = this.BezierSegment.ControlPoint2.get(timestamp);
        var point3 = this.getPoint2(timestamp);

        context.bezierCurveTo(point1.X, point1.Y, point2.X, point2.Y, point3.X, point3.Y);
    },
    getPoint1:function (timestamp) {
//        if (this.DrawnSegment1 != null && this.DrawnSegment1.IsCorner) {
//            return this.DrawnSegment1.getPoint2(timestamp);
//        }
        return this.BezierSegment.Joint1.Point.get(timestamp);
    },
    getPoint2:function (timestamp) {
//        if (this.DrawnSegment2 != null && this.DrawnSegment2.IsCorner) {
//            return this.DrawnSegment2.getPoint1(timestamp);
//        }
        return this.BezierSegment.Joint2.Point.get(timestamp);
    }
});