/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 26/02/12
 * Time: 12:27 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created by JetBrains WebStorm.
 * User: jproulx
 * Date: 21/02/12
 * Time: 12:46 PM
 * To change this template use File | Settings | File Templates.
 */


var PolyLineShape = Shape.extend({
    init:function (points, hasRoundedCorners, isClosedPath) {

        this.Logger = log4javascript.getDefaultLogger();

        if (points == undefined)
        {
            return;
        }
        this.isRoundedCorner = hasRoundedCorners;
        this.IsClosedPath = isClosedPath;
        var segments = new Array();
        this.Joints = new Array();
        this.Points = points;

        for (var i = 0; i < points.length; i++) {
            var joint = null;

            if (!isClosedPath && (i == 0 || i == (points.length - 1))) {
                this.Joints.push(new ArrowEndPoint(points[i], 30, 15));
            }
            else {
                if (this.isRoundedCorner) {
                    this.Joints.push(new ArcJoint(points[i], 40));
                }
                else {
                    this.Joints.push(new Joint(points[i]));
                }
            }
        }

        for (var i = 0; i < this.Joints.length; i++) {
            if (!isClosedPath && i == (this.Joints.length - 1)) {
                break;
            }
            segments.push(new LineSegment());
        }

        this._linkJointsAndSegments(segments);

        var path = new Path(segments, isClosedPath);

        this._super(path);
    },
    clone: function () {
        var newShape = new PolyLineShape();
        newShape.copy(this);
        return newShape;
    },
    copy:function (other) {
        this._super(other);

        this.IsRoundCorner = other.IsRoundCorner;
        this.IsClosedPath = other.IsClosedPath;

        this.Points = new Array();

        this.Path = other.Path.clone();
        var segments = new Array();
        for (var i = 0; i < other.Path.Segments.length; i++) {
            segments.push(other.Path.Segments[i].clone());
        }

        this.Path.Segments = segments;
        this.Joints = new Array();

        for (var i = 0; i < other.Path.Segments.length; i++) {
            this.Joints.push(other.Path.Segments[i].Joint1.clone());

            if (!this.IsClosedPath && i == (other.Path.Segments.length - 1))
            {
                this.Joints.push(other.Path.Segments[i].Joint2.clone());
            }
        }

        for (var i = 0; i < this.Joints.length; i++) {
            this.Points.push(this.Joints[i].Point);
        }

        this._linkJointsAndSegments(segments);
    },
    _linkJointsAndSegments: function(segments) {

        for (var i = 0; i < this.Joints.length; i++) {
            if (i == 0) {
                if (!this.IsClosedPath) {
                    this.Joints[i].setSegment(segments[0]);
                }
                else {
                    this.Joints[i].setSegments(segments[segments.length - 1], segments[0]);
                }
            }
            else if (i == (this.Joints.length - 1)) {
                if (!this.IsClosedPath) {
                    this.Joints[i].setSegment(segments[i - 1]);
                }
                else {
                    this.Joints[i].setSegments(segments[i - 1], segments[i]);
                }
            }
            else {
                this.Joints[i].setSegments(segments[i - 1], segments[i]);
            }
        }

        var upperBound = this.Joints.length;
        if (!this.IsClosedPath) {
            upperBound = upperBound - 1;
        }

        for (var j = 0; j < upperBound; j++) {
            if (j == (this.Joints.length - 1) && this.IsClosedPath) {
                segments[j].setJoints(this.Joints[j], this.Joints[0]);
            }
            else {
                segments[j].setJoints(this.Joints[j], this.Joints[j + 1]);
            }
        }
    },
    setPoints:function (points) {
        if (points.length != this.Points.length) {
            this.Logger.error("PolyLineShape.setPoints() -> Invalid argument");
            return;
        }

        for (var i = 0; i < this.Points.length; i++) {
            this.Points[i].copy(points[i]);
        }
    },
    generateTransformations: function (other, startTime, endTime) {
        var transformations = new Array();

        for (var i = 0; i < this.Joints.length; i++) {
            if (!other.Joints[i].Point.equals(this.Joints[i].Point)) {
                transformations.push(new PointTransformation(this.Joints[i].Point, this.Joints[i].Point.clone(), other.Joints[i].Point.clone(), startTime, endTime));
            }
        }

        return transformations;
    } ,
    toString:function () {
        return "PolyLineShape " + this._super();
    }
});