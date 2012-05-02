var RoundedRectangleShape = PolyLineShape.extend(
    {
        init: function (x, y, w, h, l) {
//            var segment1 = new LineSegment();
//            var segment2 = new LineSegment();
//            var segment3 = new LineSegment();
//            var segment4 = new LineSegment();
//
//            var joint1 = new ArcJoint(new Point(x, y), l);
//            var joint2 = new ArcJoint(new Point(x + w, y), l);
//            var joint3 = new ArcJoint(new Point(x + w, y + h), l);
//            var joint4 = new ArcJoint(new Point(x, y + h), l);
//
//            joint1.setSegments(segment4, segment1);
//            joint2.setSegments(segment1, segment2);
//            joint3.setSegments(segment2, segment3);
//            joint4.setSegments(segment3, segment4);
//
//
//            segment1.setJoints(joint1, joint2);
//            segment2.setJoints(joint2, joint3);
//            segment3.setJoints(joint3, joint4);
//            segment4.setJoints(joint4, joint1);
//
//
//            var array = new Array();
//            array.push(segment1);
//            array.push(segment2);
//            array.push(segment3);
//            array.push(segment4);
//
//            var path = new Path(array, true);
//
//            this._super(path);

            var points = new Array();



            points.push(new Point(x, y));
            points.push(new Point(x + w, y));
            points.push(new Point(x + w, y + h));
            points.push(new Point(x, y + h));



            this._super(points, true, true);


        }



    });