var Path = Class.extend(
    {
        init: function(segments, isClosedPath) {
            this.Segments = segments;
            this.isClosedPath = isClosedPath;
        },
        copy: function(other) {
            this.isClosedPath = other.isClosedPath;
        },
        clone: function() {
            var newPath = new Path(null, null);
            newPath.copy(this);
            return newPath;
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

