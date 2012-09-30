define([
    'libs/ctor/ctor',
    'element/renderer/SegmentRenderer'],
    function (Ctor, SegmentRenderer) {
        var LineSegmentRenderer = Ctor(SegmentRenderer, function (_super) {
            this.init = function (lineSegment) {
                _super.init(lineSegment, false);
            };
            this.render = function (t, context, startRatio, endRatio) {
                var point;
                if (arguments.length > 2 && endRatio < 1) {
                    point = this.Segment.pointFromRatio(t, endRatio);
                }
                else {
                    point = this.Segment.Joint2.getPosition(t);
                }
                context.lineTo(point.X, point.Y);
            };
            this.getPoint1 = function (t, startRatio, endRatio) {
                if (arguments.length > 1 && startRatio > 0) {
                    return this.Segment.pointFromRatio(t, startRatio);
                }
                return this.Segment.Joint1.getPosition(t);
            };
            this.getPoint2 = function (t, startRatio, endRatio) {
                if (arguments.length > 1 && endRatio < 1) {
                    return this.Segment.pointFromRatio(t, endRatio);
                }
                return this.Segment.Joint2.getPosition(t);
            };
        });

        return LineSegmentRenderer;
    });