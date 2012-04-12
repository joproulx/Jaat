/**
 * Created by JetBrains WebStorm.
 * User: jproulx
 * Date: 21/02/12
 * Time: 12:46 PM
 * To change this template use File | Settings | File Templates.
 */


var RectangleShape = Shape.extend(
{
    init: function(x, y, w, h)
    {
        var segment1 = new LineSegment(joint1, joint2);
        var segment2 = new LineSegment(joint2, joint3);
        var segment3 = new LineSegment(joint3, joint4);
        var segment4 = new LineSegment(joint4, joint1);

        var joint1 = new Joint(new Point(x, y), segment4, segment1);
        var joint2 = new Joint(new Point(x+w, y), segment1, segment2);
        var joint3 = new Joint(new Point(x+w, y+h), segment2, segment3);
        var joint4 = new Joint(new Point(x, y+h), segment3, segment4);

        segment1.setJoints(joint1, joint2);
        segment2.setJoints(joint2, joint3);
        segment3.setJoints(joint3, joint4);
        segment4.setJoints(joint4, joint1);

        joint1.Segment1 = segment4;
        joint1.Segment2 = segment1;
        joint2.Segment1 = segment1;
        joint2.Segment2 = segment2;
        joint3.Segment1 = segment2;
        joint3.Segment2 = segment3;
        joint4.Segment1 = segment3;
        joint4.Segment2 = segment4;

        var array = new Array();
        array.push(segment1);
        array.push(segment2);
        array.push(segment3);
        array.push(segment4);

        var path = new Path(array, true);

        this._super(path);
    }



});