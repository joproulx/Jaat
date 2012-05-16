var LineDrawnSegment = DrawnSegment.extend({
    init:function (lineSegment) {
        this._super(false);
        this.LineSegment = lineSegment;
    },
    render:function (context, timestamp) {
        var point = this.getPoint2(timestamp);
        context.lineTo(point.X, point.Y);
    },
    getPoint1:function (timestamp) {
        if (this.DrawnSegment1 != null && this.DrawnSegment1.IsCorner) {
            return this.DrawnSegment1.getPoint2(timestamp);
        }
        return this.LineSegment.Joint1.Point.get(timestamp);
    },
    getPoint2:function (timestamp) {
        if (this.DrawnSegment2 != null && this.DrawnSegment2.IsCorner) {
            return this.DrawnSegment2.getPoint1(timestamp);
        }
        return this.LineSegment.Joint2.Point.get(timestamp);
    }
});