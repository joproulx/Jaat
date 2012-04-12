var RoundedRectangleShape = Shape.extend(
    {
        init: function(x, y, w, h, l)
        {

            var segment1 = new LineSegment(joint1, joint2);
            var segment2 = new LineSegment(joint2, joint3);
            var segment3 = new LineSegment(joint3, joint4);
            var segment4 = new LineSegment(joint4, joint1);

            var joint1 = new ArcJoint(new Point(x, y), segment4, segment1, l);
            var joint2 = new ArcJoint(new Point(x+w, y), segment1, segment2, l);
            var joint3 = new ArcJoint(new Point(x+w, y+h), segment2, segment3, l);
            var joint4 = new ArcJoint(new Point(x, y+h), segment3, segment4, l);

            segment1.setJoints(joint1, joint2);
            segment2.setJoints(joint2, joint3);
            segment3.setJoints(joint3, joint4);
            segment4.setJoints(joint4, joint1);


            var array = new Array();
            array.push(segment1);
            array.push(segment2);
            array.push(segment3);
            array.push(segment4);

            var path = new Path(array, true);

            this._super(path);
        }



    });