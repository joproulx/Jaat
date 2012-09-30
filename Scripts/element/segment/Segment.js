define([
    'libs/ctor/ctor',
    'common/Line',
    'common/timedValue/LinearTimedValue',
    'scene/SceneNodePointAdapter'],
    function (Ctor, Line, LinearTimedValue, SceneNodePointAdapter) {
        var Segment = Ctor(function () {
            this.init = function () {
                this.Joint1 = null;
                this.Joint2 = null;
                this.StartRatio = new LinearTimedValue(0);
                this.EndRatio = new LinearTimedValue(1);
            };
            this.setJoints = function (joint1, joint2) {
                this.Joint1 = joint1;
                this.Joint2 = joint2;
                this.Line = new Line(new SceneNodePointAdapter(joint1.SceneNode),
                                     new SceneNodePointAdapter(joint2.SceneNode));
            };
            this.getDrawnRatios = function () {
                return null;
            };
        });
        return Segment;
    });
