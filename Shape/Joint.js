var Joint = Class.extend({
    init:function (sceneNode) {
        this.SceneNode = sceneNode;
    },
    setSegments:function (segment1, segment2) {
        this.Segment1 = segment1;
        this.Segment2 = segment2;
    },
    getOtherSegment:function (segment) {
        return (segment == this.Segment1) ? this.Segment2 : this.Segment1;
    },
    createSegmentRenderer:function () {
        return null;
    },
    getPosition:function(t){
        return this.SceneNode.getPosition(t);
    },
    toString:function () {
        return "[Joint {" + this.getPosition().toString() + "}]";
    }
});
