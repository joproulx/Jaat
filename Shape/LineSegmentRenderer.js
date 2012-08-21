var LineSegmentRenderer = SegmentRenderer.extend({
    init:function (lineSegment) {
        this._super(lineSegment, false);
    },
    render:function (t, context, endRatio) {
        //var point = this.getPoint2(t);

        var point;

        if (arguments.length > 2 && endRatio < 1){
            point = this.Segment.pointFromRatio(t, endRatio);
        }
        else{
            point = this.Segment.Joint2.getPosition(t);
        }
        context.lineTo(point.X, point.Y);
    },
    getPoint1:function (t) {
        if (this.SegmentRenderer1 != null && this.SegmentRenderer1.IsCorner) {
            return this.SegmentRenderer1.getPoint2(t);
        }
        return this.Segment.Joint1.getPosition(t);
    },
    getPoint2:function (t) {
        if (this.SegmentRenderer2 != null && this.SegmentRenderer2.IsCorner) {
            return this.SegmentRenderer2.getPoint1(t);
        }
        return this.Segment.Joint2.getPosition(t);
    }
});