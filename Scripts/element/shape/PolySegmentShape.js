define([
    'libs/ctor/ctor',
    'element/shape/Shape',
    'scene/SceneNode',
    'element/joint/Joint',
    'element/joint/EndPoint',
    'element/segment/BezierSegment',
    'element/segment/LineSegment',
    'element/Path'],
    function (Ctor, Shape, SceneNode, Joint, EndPoint, BezierSegment, LineSegment, Path) {
        var PolySegmentShape = Ctor(Shape, function (_super) {
            this.Segments = [];
            this.Joints = [];

            this.init = function (t, pathJson) {
                this.SceneNode = new SceneNode();
                this.SceneNode.setPosition(t, pathJson.Origin);
                var path = this.loadFromObject(t, pathJson);
                _super.init(path);
            };
            this.extractJoints = function (t, item, isEndPoint) {
                var sceneNode = new SceneNode(this.SceneNode);
                sceneNode.translate(t, item.X, item.Y);

                if (this.IsClosedPath || !isEndPoint) {
                    this.Joints.push(new Joint(sceneNode));
                }
                else {
                    this.Joints.push(new EndPoint(sceneNode));
                }
            };
            this.extractSegments = function (t, item) {
                if (item.SegmentType === "bezier") {
                    var segment = new BezierSegment();
                    var sceneNode = new SceneNode(this.SceneNode);
                    sceneNode.translate(t, item.ControlPoint1.X, item.ControlPoint1.Y);
                    var sceneNode2 = new SceneNode(this.SceneNode);
                    sceneNode2.translate(t, item.ControlPoint2.X, item.ControlPoint2.Y);
                    segment.setControlPoints(sceneNode, sceneNode2);
                    this.Segments.push(segment);
                }
                else if (item.SegmentType === "line") {
                    this.Segments.push(new LineSegment());
                }
            };
            this.loadFromObject = function (t, object) {
                var isJoint = true;
                this.Segments = [];
                this.Joints = [];

                var thisObj = this;
                this.IsClosedPath = object.IsClosedPath;
                var index = 0;
                _.each(object.Items, function (item) {
                    if (isJoint) {
                        var isEndPoint = (index === 0 || index === (object.Items.length - 1));
                        thisObj.extractJoints(t, item, isEndPoint);
                    }
                    else {
                        thisObj.extractSegments(t, item);
                    }
                    isJoint = !isJoint;
                    index++;
                });

                this.linkJointsAndSegments(this.Segments);
                return new Path(this.Segments, this.IsClosedPath);
            };
            this.linkJointsAndSegments = function (segments) {
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
            };
            this.toString = function () {
                return "PolySegmentShape " + _super.toString();
            };
        });
        return PolySegmentShape;
    });