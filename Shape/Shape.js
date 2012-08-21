var Shape = Class.extend(
    {
        init:function (path) {
            this.Id = generateGuid();
            this.Path = null;
            this.ShapeRenderer = null;
            this.Path = path;
            this.StrokeColor = new LinearTimedValue({R:0, G:0, B:0});
            this.StrokeOpacity = new LinearTimedValue(1);
            this.StrokeRatio = { Start: new LinearTimedValue(0), End: new LinearTimedValue(1) }
        },
        createShapeRenderer:function () {
            return new ShapeRenderer(this);
        },
        render:function (t, context) {
            if (this.ShapeRenderer == null) {
                this.ShapeRenderer = this.createShapeRenderer();
            }

            this.ShapeRenderer.render(t, context);
        },
        toString:function () {
            return "{ID:" + this.Id + "\r\n" + this.Path.toString() + "}";
        }
    });


//function Shape(path)
//{
//    this.m_context = document.getElementsByTagName('canvas')[0].getContext('2d');
//
//    this.Path = path;
//
//
//
//
//    this.drawShape = function(path, length)
//    {
//        var lineSegments = path.getLineSegments();
//        var strokeStyle =  '#AAAAAA';
//        var lineWidth = 5;
//
//        this.m_context.save();
//        this.m_context.beginPath();
//        this.m_context.strokeStyle = strokeStyle;
//        this.m_context.lineWidth = lineWidth;
//
//
//
//        for(var i = 0; i < lineSegments.length; i++)
//        {
//            var drawArc = true;
//            var lineSegment = lineSegments[i];
//            var lineSegment2 = null;
//
//
//            var point1 = lineSegment.pointFromLength(length);
//            var point2 = lineSegment.pointFromLength(lineSegment.length() - length);
//
//            if (i == 0 && !path.isClosedPath)
//            {
//                point1 = lineSegment.From;
//            }
//
//            if (i == (lineSegments.length - 1) )
//            {
//                if (!path.isClosedPath)
//                {
//                    point2 = lineSegment.To;
//                    drawArc = false;
//                }
//                else
//                {
//                    lineSegment2 = lineSegments[0];
//                }
//            }
//            else
//            {
//                lineSegment2 = lineSegments[i+1];
//            }
//
//
//            var line = new LineSegment(point1, point2);
//            line.render(this.m_context);
//
//            //this.m_context.moveTo(point1.X, point1.Y);
//            //this.m_context.lineTo(point2.X, point2.Y);
////            this.m_context.stroke();
////            this.m_context.restore();
//
//            if (drawArc)
//            {
//                point1 = lineSegment.pointFromLength(lineSegment.length() - length);
//                var linePerpendicular1 = lineSegment.Line.getPerpendicularLine(point1);
//
//                point2 = lineSegment2.pointFromLength(length);
//                var linePerpendicular2 = lineSegment2.Line.getPerpendicularLine(point2);
//
//                var pointIntersect = linePerpendicular1.getIntersectionPoint(linePerpendicular2);
//
//                var radius = pointIntersect.distanceFrom(point1);
//
//                var angle1 = Math.atan2((point1.Y - pointIntersect.Y), (point1.X - pointIntersect.X));
//                var angle2 = Math.atan2((point2.Y - pointIntersect.Y), (point2.X - pointIntersect.X));
//
//
//    //            this.m_context.save();
//    //            this.m_context.beginPath();
//    //            this.m_context.strokeStyle = strokeStyle;
//    //            this.m_context.lineWidth = lineWidth;
//    //            this.m_context.moveTo(point2.X, point2.Y);
//    //            this.m_context.lineTo(p3.X, p3.Y);
//    //            this.m_context.stroke();
//    //            this.m_context.restore();
//
////                this.m_context.save();
////                this.m_context.beginPath();
////                this.m_context.strokeStyle = strokeStyle;
////                this.m_context.lineWidth = lineWidth;
//                this.m_context.arc(pointIntersect.X,pointIntersect.Y,radius,angle1,angle2, false);
//
//            }
//        }
//
//        this.m_context.stroke();
//        this.m_context.restore();
//    }
//
//    //this.drawShape(path, 10);
//}