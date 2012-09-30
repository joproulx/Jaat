define([
    'libs/ctor/ctor',
    'element/renderer/SegmentRenderer'],
    function (Ctor, SegmentRenderer) {
        var BezierSegmentRenderer = Ctor(SegmentRenderer, function (_super) {
            this.init = function (bezierSegment) {
                _super.init(bezierSegment, false);
            };
            this.render = function (t, context, startRatio, endRatio) {
                var point1 = this.getControlPoint1(t, startRatio, endRatio);
                var point2 = this.getControlPoint2(t, startRatio, endRatio);
                var point3 = this.getPoint2(t, startRatio, endRatio);
                context.bezierCurveTo(point1.X, point1.Y, point2.X, point2.Y, point3.X, point3.Y);
            };
            this.getPoint1 = function (t, startRatio, endRatio) {
                // Todo: Memoize start and end ratio
                // Todo: Memoize getSubSegment
                if (arguments.length > 1 && startRatio != 0) {
                    var points = this.Segment.getSubSegment(t, startRatio, endRatio);
                    return points[0];
                }
                else {
                    return this.Segment.Joint1.getPosition(t);
                }
            };
            this.getPoint2 = function (t, startRatio, endRatio) {
                // Todo: Memoize start and end ratio
                // Todo: Memoize getSubSegment
                if (arguments.length > 1 && endRatio >= 0 && endRatio < 1) {
                    var points = this.Segment.getSubSegment(t, startRatio, endRatio);
                    return points[3];
                }
                else {
                    return this.Segment.Joint2.getPosition(t);
                }
            };
            this.getControlPoint1 = function (t, startRatio, endRatio) {
                // Todo: Memoize start and end ratio
                // Todo: Memoize getSubSegment
                if (arguments.length > 1 && (startRatio != 0 || endRatio != 1)) {
                    var points = this.Segment.getSubSegment(t, startRatio, endRatio);
                    return points[1];
                }
                else {
                    return this.Segment.ControlPoint1.getPosition(t);
                }
            };
            this.getControlPoint2 = function (t, startRatio, endRatio) {
                // Todo: Memoize start and end ratio
                // Todo: Memoize getSubSegment
                if (arguments.length > 1 && (startRatio != 0 || endRatio != 1)) {
                    var points = this.Segment.getSubSegment(t, startRatio, endRatio);
                    return points[2];
                }
                else {
                    return this.Segment.ControlPoint2.getPosition(t);
                }
            };
        });
        return BezierSegmentRenderer;
    });