var PolyLineShape = Shape.extend({
    init:function (pathJson, timestamp){//(timestamp, points, hasRoundedCorners, isClosedPath) {
//        if (points == undefined) {
//            return;
//        }
//
//        this.SceneNode = new SceneNode();
//        this.SceneNode.setPosition(points[0], timestamp);
//
//        //this.Logger = log4javascript.getDefaultLogger();
//        this.isRoundedCorner = hasRoundedCorners;
//        this.IsClosedPath = isClosedPath;
//        var segments = new Array();
//        this.Joints = new Array();
//        this.Points = _.map(points, function (value) {
//            var childSceneNode = new SceneNode(this.SceneNode);
//            var point = new SceneNodeTimedValue(childSceneNode);
//            point.set(value, timestamp);
//            return point;
//        }.bind(this));
//
//        for (var i = 0; i < this.Points.length; i++) {
//            var joint = null;
//            var point = this.Points[i];
//
//            if (!isClosedPath && (i == 0 || i == (points.length - 1))) {
//                //this.Joints.push(new ArrowEndPoint(point, 30, 15));
//                this.Joints.push(new EndPoint(point, 30, 15));
//            }
//            else {
//                if (this.isRoundedCorner) {
//                    this.Joints.push(new ArcJoint(point, 40));
//                }
//                else {
//                    this.Joints.push(new Joint(point));
//                }
//            }
//        }
//
//        for (var i = 0; i < this.Joints.length; i++) {
//            if (!isClosedPath && i == (this.Joints.length - 1)) {
//                break;
//            }
//            segments.push(new LineSegment());
//            //segments.push(new BezierSegment());
//        }
//
//        this._linkJointsAndSegments(segments);
        //var path = new Path(segments, isClosedPath);
        this.IsClosedPath = false;
        this.SceneNode = new SceneNode();

        var path = this.loadFromObject(pathJson, timestamp);
        this.SceneNode.setPosition(new Point(pathJson[0].X, pathJson[0].Y), timestamp);


        this._super(path);
    },
    extractJoints:function(item, timestamp){
        var point = new Point(item.X, item.Y);

        var childSceneNode = new SceneNode(this.SceneNode);
        var sceneNode = new SceneNodeTimedValue(childSceneNode);
        sceneNode.set(point, timestamp);
        this.Points.push(sceneNode);

        if (item.JointType === "arc"){
            this.Joints.push(new ArcJoint(sceneNode, item.ArcLength));
        }
        else if (item.JointType === "corner"){
            this.Joints.push(new Joint(sceneNode));
        }
        else if (item.JointType === "arrowEndPoint"){
            this.Joints.push(new ArrowEndPoint(sceneNode, item.ArrowWidth, item.ArrowHeight));
        }
        else if (item.JointType === "endPoint"){
            this.Joints.push(new EndPoint(sceneNode));
        }
    },
    extractSegments:function(item, timestamp){

        if (item.SegmentType === "bezier"){
            var segment = new BezierSegment();

            var childSceneNode = new SceneNode(this.SceneNode);
            var sceneNode = new SceneNodeTimedValue(childSceneNode);
            sceneNode.set(new Point(item.ControlPoint1.X, item.ControlPoint1.Y), timestamp);

            var childSceneNode2 = new SceneNode(this.SceneNode);
            var sceneNode2 = new SceneNodeTimedValue(childSceneNode2);
            sceneNode2.set(new Point(item.ControlPoint2.X, item.ControlPoint2.Y), timestamp);

            segment.setControlPoints(sceneNode, sceneNode2);

            this.Segments.push(segment);
        }
        else if (item.SegmentType === "line"){
            this.Segments.push(new LineSegment());
        }
    },
    loadFromObject:function(object, timestamp){
        var item;

        var isJoint = true;
        this.Segments = new Array();
        this.Joints = new Array();
        this.Points = new Array();

        var thisObj = this;

        _.each(object, function(item){
            if (isJoint){
                thisObj.extractJoints(item, timestamp);
            }
            else{
                thisObj.extractSegments(item, timestamp);
            }
            isJoint = !isJoint;
        });

        this._linkJointsAndSegments(this.Segments);
        return new Path(this.Segments, this.IsClosedPath);
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