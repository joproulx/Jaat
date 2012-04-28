/**
* Created by JetBrains WebStorm.
* User: jproulx
* Date: 21/02/12
* Time: 12:46 PM
* To change this template use File | Settings | File Templates.
*/
var RectangleShape = Shape.extend(
{
    init: function (x, y, w, h) {
        this.X = x;
        this.Y = y;
        this.W = w;
        this.H = h;


        var segment1 = new LineSegment();
        var segment2 = new LineSegment();
        var segment3 = new LineSegment();
        var segment4 = new LineSegment();

        var joint1 = new Joint(new Point(x, y));
        var joint2 = new Joint(new Point(x + w, y));
        var joint3 = new Joint(new Point(x + w, y + h));
        var joint4 = new Joint(new Point(x, y + h));

        this.Joint1 = joint1;
        this.Joint2 = joint2;
        this.Joint3 = joint3;
        this.Joint4 = joint4;


        segment1.setJoints(joint1, joint2);
        segment2.setJoints(joint2, joint3);
        segment3.setJoints(joint3, joint4);
        segment4.setJoints(joint4, joint1);

        joint1.setSegments(segment4, segment1);
        joint2.setSegments(segment1, segment2);
        joint3.setSegments(segment2, segment3);
        joint4.setSegments(segment3, segment4);

        var array = new Array();
        array.push(segment1);
        array.push(segment2);
        array.push(segment3);
        array.push(segment4);

        var path = new Path(array, true);

        this._super(path);
    },
    copy: function (other) {
        this._super(other);

        this.X = other.X;
        this.Y = other.Y;
        this.W = other.W;
        this.H = other.H;


        this.Path = other.Path.clone();
        var segment1 = other.Path.Segments[0].clone();
        var segment2 = other.Path.Segments[1].clone();
        var segment3 = other.Path.Segments[2].clone();
        var segment4 = other.Path.Segments[3].clone();

        var array = new Array();
        array.push(segment1);
        array.push(segment2);
        array.push(segment3);
        array.push(segment4);

        this.Path.Segments = array;

        var joint1 = other.Path.Segments[0].Joint1.clone();
        var joint2 = other.Path.Segments[1].Joint1.clone();
        var joint3 = other.Path.Segments[2].Joint1.clone();
        var joint4 = other.Path.Segments[3].Joint1.clone();

        this.Joint1 = joint1;
        this.Joint2 = joint2;
        this.Joint3 = joint3;
        this.Joint4 = joint4;

        
        segment1.setJoints(joint1, joint2);
        segment2.setJoints(joint2, joint3);
        segment3.setJoints(joint3, joint4);
        segment4.setJoints(joint4, joint1);

        joint1.setSegments(segment4, segment1);
        joint2.setSegments(segment1, segment2);
        joint3.setSegments(segment2, segment3);
        joint4.setSegments(segment3, segment4);
    },
    clone: function () {
        var newShape = new RectangleShape(null);
        newShape.copy(this);
        return newShape;
    },
    setSize: function (x, y, w, h) {
        this.Joint1.Point.X = x;
        this.Joint1.Point.Y = y;
        this.Joint2.Point.X = x + w;
        this.Joint2.Point.Y = y;
        this.Joint3.Point.X = x + w;
        this.Joint3.Point.Y = y + h;
        this.Joint4.Point.X = x;
        this.Joint4.Point.Y = y + h;
    },
    generateTransformations: function (other, startTime, endTime) {
        var transformations = new Array();
        
        if (!this.Joint1.Point.equals(other.Joint1.Point)) {
            transformations.push(new PointTransformation(this.Joint1.Point, this.Joint1.Point.clone(), other.Joint1.Point.clone(), startTime, endTime));
        }

        if (!this.Joint2.Point.equals(other.Joint2.Point)) {
            transformations.push(new PointTransformation(this.Joint2.Point, this.Joint2.Point.clone(), other.Joint2.Point.clone(), startTime, endTime));
        }

        if (!this.Joint3.Point.equals(other.Joint3.Point)) {
            transformations.push(new PointTransformation(this.Joint3.Point, this.Joint3.Point.clone(), other.Joint3.Point.clone(), startTime, endTime));
        }

        if (!this.Joint4.Point.equals(other.Joint4.Point)) {
            transformations.push(new PointTransformation(this.Joint4.Point, this.Joint4.Point.clone(), other.Joint4.Point.clone(), startTime, endTime));
        }
        
        return transformations;
    }


});