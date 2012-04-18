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


var PolyLineShape = Shape.extend(
    {
        init: function (points) {
            this.isRoundedCorner = true;
            
            var segments = new Array();
            var joints = new Array();

            for (var i = 0; i < points.length; i++) {
                var joint;

                if (i < points.length - 1) {
                    var segment = new LineSegment();
                    segments.push(segment);
                }
                if (i == 0) {
                    joint = new ArrowEndPoint(points[i], 30, 15);
                    //joint = new EndPoint(points[i], segments[i]);

                    joint.setSegment(segments[i]);
                }
                else if (i == points.length - 1) {
                    //joint = new EndPoint(points[i], segments[i-1]);
                    joint = new ArrowEndPoint(points[i], 30, 15);

                    joint.setSegment(segments[i-1]);
                }
                else {
                    if (this.isRoundedCorner) {
                        joint = new ArcJoint(points[i], 40);
                    }
                    else {
                        joint = new Joint(points[i]);
                    }

                    joint.setSegments(segments[i - 1], segments[i]);
                }
                


                joints.push(joint);
            }

            for (var j = 0; j < joints.length - 1; j++) {
                segments[j].setJoints(joints[j], joints[j + 1]);
            }

            var path = new Path(segments, false);

            this._super(path);
        }




    });