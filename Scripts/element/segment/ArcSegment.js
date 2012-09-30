define([
    'libs/ctor/ctor',
    'element/segment/Segment'],
    function (Ctor, Segment) {
        var ArcSegment = Ctor(Segment, function (_super) {
            this.init = function () {
            };
            this.setJoints = function (joint1, joint2) {
                this.Joint1 = joint1;
                this.Joint2 = joint2;
            };
        });
        return ArcSegment;
    });
