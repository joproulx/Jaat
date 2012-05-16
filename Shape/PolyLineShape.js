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
    init:function (timestamp, points, hasRoundedCorners, isClosedPath) {
        if (points == undefined) {
            return;
        }

        //this.Logger = log4javascript.getDefaultLogger();
        this.isRoundedCorner = hasRoundedCorners;
        this.IsClosedPath = isClosedPath;
        var segments = new Array();
        this.Joints = new Array();
        this.Points = _.map(points, function (value) {
            var point = new TimedValue();
            point.set(value, timestamp);
            return point;
        });

        for (var i = 0; i < this.Points.length; i++) {
            var joint = null;
            var point = this.Points[i];

            if (!isClosedPath && (i == 0 || i == (points.length - 1))) {
                //this.Joints.push(new ArrowEndPoint(point, 30, 15));
                this.Joints.push(new EndPoint(point, 30, 15));
            }
            else {
                if (this.isRoundedCorner) {
                    this.Joints.push(new ArcJoint(point, 40));
                }
                else {
                    this.Joints.push(new Joint(point));
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
    _linkJointsAndSegments:function (segments) {
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
    toString:function () {
        return "PolyLineShape " + this._super();
    }
});