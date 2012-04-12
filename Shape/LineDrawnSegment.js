
var LineDrawnSegment = DrawnSegment.extend({
    init: function(lineSegment)
    {
        this._super(false);
        this.LineSegment = lineSegment;
    },
    render : function(context)
    {
        context.lineTo(this.getPoint2().X, this.getPoint2().Y);
    },
    getPoint1: function()
    {
        var point1 = this.LineSegment.Joint1.Point;
        if (this.DrawnSegment1 != null && this.DrawnSegment1.IsCorner)
        {
            point1 = this.DrawnSegment1.getPoint2();
        }

        return point1;
    },
    getPoint2: function()
    {
        var point2 = this.LineSegment.Joint2.Point;
        if (this.DrawnSegment2 != null && this.DrawnSegment2.IsCorner)
        {
            point2 = this.DrawnSegment2.getPoint1();
        }
        return point2;
    }
});