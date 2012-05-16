var Path = Class.extend(
    {
        init:function (segments, isClosedPath) {
            this.Segments = segments;
            this.isClosedPath = isClosedPath;
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

