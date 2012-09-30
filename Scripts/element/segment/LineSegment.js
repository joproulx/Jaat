define([
    'libs/ctor/ctor',
    'element/segment/Segment',
    'element/renderer/LineSegmentRenderer',
    'common/Point'],
    function (Ctor, Segment, LineSegmentRenderer, Point) {
        var LineSegment = Ctor(Segment, function (_super) {
            this.init = function () {
            };
            this.createSegmentRenderer = function () {
                return new LineSegmentRenderer(this);
            };
            this.getSlope = function (t) {
                return this.Line.getSlope(t);
            };
            this.pointFromRatio = function (t, ratio) {
                var point1 = this.Joint1.getPosition(t);
                var point2 = this.Joint2.getPosition(t);
                return new Point((ratio * point2.X + (1 - ratio) * point1.X),
                    (ratio * point2.Y + (1 - ratio) * point1.Y));
            };
            this.tangentAngleFromRatio = function (t, ratio) {
                var point1 = this.Joint1.getPosition(t);
                var point2 = this.Joint2.getPosition(t);
                return Math.atan2(point2.Y - point1.Y, point2.X - point1.X);
            };
            this.pointFromLength = function (t, length) {
                return this.pointFromRatio(t, length / this.length(t));
            };
            this.length = function (t) {
                var point1 = this.Joint1.getPosition(t);
                var point2 = this.Joint2.getPosition(t);

                return Math.sqrt(Math.pow(point2.Y - point1.Y, 2) +
                    Math.pow(point2.X - point1.X, 2));
            };
            this.getPerpendicularLine = function (t, point) {
                return this.Line.getPerpendicularLine(t, point);
            };
            this.getIntersectionPoint = function (t, otherLine) {
                return this.Line.getIntersectionPoint(t, otherLine);
            };
        });
        return LineSegment;
    });


