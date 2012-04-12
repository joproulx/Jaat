var Joint = Class.extend(
    {
        init: function(point, segment1, segment2)
        {
            this.Point = point;
            this.Segment1 = segment1;
            this.Segment2 = segment2;
        },

        getOtherSegment: function(segment)
        {
            return (segment == this.Segment1) ? this.Segment2 : this.Segment1;
        },
        createDrawnSegment: function()
        {
            return null;
        }
    });
