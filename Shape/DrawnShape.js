var DrawnShape = Class.extend(
{
    init: function(shape)
    {
        this.Shape = shape;
        this.IsIndependantShape = false;

        var segmentToJoin = null;

        this.DrawnSegments = new Array();

        var segment = this.Shape.Path.Segments[0];

        while(1)
        {
            var newSegment = segment.createDrawnSegment();

            newSegment.DrawnSegment1 = segmentToJoin;

            if (!this.Shape.Path.isClosedPath && segment == this.Shape.Path.Segments[0])
            {
                var joint = segment.Joint1;
                var drawnSegment = joint.createDrawnSegment();

                if(drawnSegment != null)
                {
                    newSegment.DrawnSegment1 = drawnSegment;
                    drawnSegment.DrawnSegment2 = newSegment;
                    this.DrawnSegments.push(drawnSegment);
                }
            }

            if (segmentToJoin != null)
            {
                segmentToJoin.DrawnSegment2 = newSegment;
            }

            segmentToJoin = newSegment;

            this.DrawnSegments.push(newSegment);

            if (segment.Joint2 != null)
            {
                var joint = segment.Joint2;
                var drawnSegment = joint.createDrawnSegment();

                if(drawnSegment != null)
                {
                    newSegment.DrawnSegment2 = drawnSegment;
                    drawnSegment.DrawnSegment1 = newSegment;
                    segmentToJoin = drawnSegment;

                    this.DrawnSegments.push(drawnSegment);
                }
            }

            if (this.isLastSegment(segment))
            {
                if (this.Shape.Path.isClosedPath)
                {
                    this.DrawnSegments[0].DrawnSegment1 = segmentToJoin;
                    segmentToJoin.DrawnSegment2 = this.DrawnSegments[0];
                }

                break;
            }

            segment = segment.Joint2.Segment2;
        }
    },
    render: function(context)
    {
        for(var i = 0; i < this.DrawnSegments.length; i++)
        {
            if (i == 0 || this.DrawnSegments[i-1].IsIndependantShape)
            {
                this.beginRender(context);
                context.moveTo(this.DrawnSegments[i].getPoint1().X, this.DrawnSegments[i].getPoint1().Y);
            }

            this.DrawnSegments[i].render(context);

            if (i == (this.DrawnSegments.length - 1) || this.DrawnSegments[i].IsIndependantShape)
            {
                this.endRender(context);
            }
        }
    },
    beginRender: function(context)
    {
        var strokeStyle =  '#AAAAAA';
        var lineWidth = 10;
        context.save();
        context.beginPath();
        context.fillStyle = strokeStyle;
        context.strokeStyle = strokeStyle;
        context.lineWidth = lineWidth;
        context.lineJoin = "miter";
    },
    endRender: function(context)
    {
        if (this.Shape.Path.isClosedPath)
        {
            context.closePath();
        }

        context.stroke();
        context.restore();
    },
    isLastSegment: function(segment)
    {
        return this.Shape.Path.Segments[this.Shape.Path.Segments.length - 1] == segment;
    }
});
