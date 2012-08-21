var Path = Class.extend({
    init:function (segments, isClosedPath) {
        this.Segments = segments;
        this.isClosedPath = isClosedPath;
    },
    length:function(t){
        var length = 0;
        for (var i = 0; i < this.Segments.length; i++) {
            length += this.Segments[i].length(t);
        }
        return length;
    },
    getPointFromRatio:function(t, ratio){
        var segment = this.getSegmentFromRatio(t, ratio);
        if (segment != null){
            return segment.Segment.pointFromRatio(t, segment.Ratio);
        }
        return null;
    },
    getTangentAngleFromRatio:function(t, ratio){
        var segment = this.getSegmentFromRatio(t, ratio);
        if (segment != null){
            return segment.Segment.tangentAngleFromRatio(t, segment.Ratio);
        }
        return null;
    },
    getSegmentFromRatio:function(t, ratio){
        if (ratio < 0 || ratio > 1){
            throw "Invalid parameter: ratio. Must be between 0 and 1.";
        }

        var length = this.length();
        var currentLength = 0;

        for (var i = 0; i < this.Segments.length; i++) {
            var previousLength = currentLength;

            currentLength += this.Segments[i].length(t);

            var ratio1 = previousLength / length;
            var ratio2 = currentLength / length;

            if (ratio >= ratio1 && ratio <= ratio2){
                return {Ratio : (ratio - ratio1) / (ratio2 - ratio1),
                        Segment: this.Segments[i]};
            }
        }
        return null;
    },

    toString:function () {
        var result = "";
        for (var i = 0; i < this.Segments.length; i++) {
            result += " " + this.Segments[i].Joint1.toString() + " [Segment]";

            if (i == (this.Segments.length - 1)) {
                result += " " + this.Segments[i].Joint2.toString();
            }
        }
        return result;
    }
});

//    this.getLineSegments = function()
//    {
//        var lineSegments = new Array();
//        for(var i = 0; i < this.Points.length; i++)
//        {
//            var point1 = this.Points[i];
//            var point2 = null;
//            if ((i + 1) == this.Points.length)
//            {
//
//                if (this.isClosedPath)
//                {
//                    point2 =  this.Points[0];
//                }
//            }
//            else
//            {
//                point2 = this.Points[i+1];
//            }
//
//
//            if (point2 != null)
//            {
//                lineSegments.push(new LineSegment(point1, point2));
//            }
//        }
//
//        return lineSegments;
//    }

