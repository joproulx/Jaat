define([
    'libs/ctor/ctor'],
    function (Ctor) {
        var Joint = Ctor(function () {
            this.init = function (sceneNode) {
                this.SceneNode = sceneNode;
            };
            this.setSegments = function (segment1, segment2) {
                this.Segment1 = segment1;
                this.Segment2 = segment2;
            };
            this.getOtherSegment = function (segment) {
                return (segment == this.Segment1) ? this.Segment2 : this.Segment1;
            };
            this.createSegmentRenderer = function () {
                return null;
            };
            this.getPosition = function (t) {
                return this.SceneNode.getPosition(t);
            };
            this.toString = function () {
                return "[Joint {" + this.getPosition().toString() + "}]";
            };
        });
        return Joint;
    });