var BezierSegmentRenderer = SegmentRenderer.extend({
    init:function (bezierSegment) {
        this._super(bezierSegment, false);
    },
    render:function (t, context, startRatio, endRatio) {

       // var points = this.Segment.getSubSegment(t, startRatio, endRatio);

        var point1 = this.getControlPoint1(t, startRatio, endRatio);
        var point2 = this.getControlPoint2(t, startRatio, endRatio);
        var point3 = this.getPoint2(t, startRatio, endRatio);

        context.bezierCurveTo(point1.X, point1.Y, point2.X, point2.Y, point3.X, point3.Y);
    },
    getPoint1:function (t, startRatio, endRatio) {
//        if (this.SegmentRenderer1 != null && this.SegmentRenderer1.IsCorner) {
//            return this.SegmentRenderer1.getPoint2(t);
//        }
        // Todo: Memoize start and end ratio
        // Todo: Memoize getSubSegment
//        var startRatio = this.Segment.StartRatio.get(t);
//        var endRatio = this.Segment.EndRatio.get(t);
        if (arguments.length > 1 && startRatio != 0){
            var points = this.Segment.getSubSegment(t, startRatio, endRatio);
            return points[0];
        }
        else{
            return this.Segment.Joint1.getPosition(t);
        }
    },
    getPoint2:function (t, startRatio, endRatio) {
//        if (this.SegmentRenderer2 != null && this.SegmentRenderer2.IsCorner) {
//            return this.SegmentRenderer2.getPoint1(t);
//        }

        // Todo: Memoize start and end ratio
        // Todo: Memoize getSubSegment
//        var startRatio = this.Segment.StartRatio.get(t);
//        var endRatio = this.Segment.EndRatio.get(t);
        if (arguments.length > 1 && endRatio >= 0 && endRatio < 1){
            var points = this.Segment.getSubSegment(t, startRatio, endRatio);
            return points[3];
        }
        else{
            return this.Segment.Joint2.getPosition(t);
        }
    },
    getControlPoint1:function (t, startRatio, endRatio) {
        // Todo: Memoize start and end ratio
        // Todo: Memoize getSubSegment
//        var startRatio = this.Segment.StartRatio.get(t);
//        var endRatio = this.Segment.EndRatio.get(t);
        if (arguments.length > 1 && (startRatio != 0 || endRatio != 1)){
            var points = this.Segment.getSubSegment(t, startRatio, endRatio);
            return points[1];
        }
        else{
            return this.Segment.ControlPoint1.getPosition(t);
        }
    },
    getControlPoint2:function (t, startRatio, endRatio) {
        // Todo: Memoize start and end ratio
        // Todo: Memoize getSubSegment
//        var startRatio = this.Segment.StartRatio.get(t);
//        var endRatio = this.Segment.EndRatio.get(t);
        if (arguments.length > 1 && (startRatio != 0 || endRatio != 1)){
            var points = this.Segment.getSubSegment(t, startRatio, endRatio);
            return points[2];
        }
        else{
            return this.Segment.ControlPoint2.getPosition(t);
        }
    }
});