
var EndPoint = Joint.extend({
    init: function(point, segment)
    {
        this._super(point, segment, segment);
    },
    createDrawnSegment: function()
    {
        return null;
    },
    isStartEndPoint: function()
    {
        return this.Segment1.Joint1 == this;
    }
});
