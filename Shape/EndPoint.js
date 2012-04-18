
var EndPoint = Joint.extend({
    init: function(point)
    {
        this._super(point);
    },
    createDrawnSegment: function()
    {
        return null;
    },
    isStartEndPoint: function()
    {
        return this.Segment1.Joint1 == this;
    },
    setSegment: function (segment) {
        return this.setSegments(segment, segment);
    }
});
