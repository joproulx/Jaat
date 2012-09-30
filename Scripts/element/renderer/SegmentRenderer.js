define([
    'libs/ctor/ctor'],
    function (Ctor) {
        var SegmentRenderer = Ctor(function () {
            this.init = function (segment, representCorner) {
                this.Segment = segment;
                this.IsCorner = representCorner;
            };
            this.setAttachedSegments = function (segmentRenderer1, segmentRenderer2) {
                this.SegmentRenderer1 = segmentRenderer1;
                this.SegmentRenderer2 = segmentRenderer2;
            };
        });

        return SegmentRenderer;
    });