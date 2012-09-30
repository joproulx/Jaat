define([
    'libs/ctor/ctor',
    'element/joint/joint'],
    function (Ctor, Joint) {
        var EndPoint = Ctor(Joint, function (_super) {
            this.init = function (point) {
                _super.init.call(this, point);
            };
            this.createSegmentRenderer = function () {
                return null;
            };
            this.isStartEndPoint = function () {
                return this.Segment1.Joint1 == this;
            };
            this.setSegment = function (segment) {
                return this.setSegments(segment, segment);
            };
        });
        return EndPoint;
    });