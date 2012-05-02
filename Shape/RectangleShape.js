/**
* Created by JetBrains WebStorm.
* User: jproulx
* Date: 21/02/12
* Time: 12:46 PM
* To change this template use File | Settings | File Templates.
*/
var RectangleShape = PolyLineShape.extend(
{
    init: function (x, y, w, h) {
        this.X = x;
        this.Y = y;
        this.W = w;
        this.H = h;

        var points = new Array();

        points.push(new Point(x, y));
        points.push(new Point(x + w, y));
        points.push(new Point(x + w, y + h));
        points.push(new Point(x, y + h));

        this._super(points, false, true);

//        var segment1 = new LineSegment();
//        var segment2 = new LineSegment();
//        var segment3 = new LineSegment();
//        var segment4 = new LineSegment();
//
//        var joint1 = new Joint(new Point(x, y));
//        var joint2 = new Joint(new Point(x + w, y));
//        var joint3 = new Joint(new Point(x + w, y + h));
//        var joint4 = new Joint(new Point(x, y + h));
//
//        this.Joint1 = joint1;
//        this.Joint2 = joint2;
//        this.Joint3 = joint3;
//        this.Joint4 = joint4;
//
//
//        segment1.setJoints(joint1, joint2);
//        segment2.setJoints(joint2, joint3);
//        segment3.setJoints(joint3, joint4);
//        segment4.setJoints(joint4, joint1);
//
//        joint1.setSegments(segment4, segment1);
//        joint2.setSegments(segment1, segment2);
//        joint3.setSegments(segment2, segment3);
//        joint4.setSegments(segment3, segment4);
//
//        var array = new Array();
//        array.push(segment1);
//        array.push(segment2);
//        array.push(segment3);
//        array.push(segment4);
//
//        var path = new Path(array, true);
//
//        this._super(path);
    },
    copy: function (other) {
        this._super(other);

        this.X = other.X;
        this.Y = other.Y;
        this.W = other.W;
        this.H = other.H;
    },
    clone: function () {
        var newShape = new RectangleShape(this.X, this.Y, this.W, this.H);
        newShape.copy(this);
        return newShape;
    },
    setSize: function (x, y, w, h) {
        this.setPoints([new Point(x, y),
                        new Point(x + w, y),
                        new Point(x + w, y +h),
                        new Point(x, y + h)]);
    }


});