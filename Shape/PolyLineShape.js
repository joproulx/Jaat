var PolySegmentShape = Shape.extend({
    init:function (t, pathJson){
        this.SceneNode = new SceneNode();
        this.SceneNode.setPosition(t, pathJson.Origin);
        var path = this.loadFromObject(t, pathJson);

        this._super(path);
    },
    extractJoints:function(t, item, isEndPoint){
        var sceneNode = new SceneNode(this.SceneNode);
        sceneNode.translate(t, item.X, item.Y);

        if (this.IsClosedPath || !isEndPoint){
            this.Joints.push(new Joint(sceneNode));
        }
        else{
            this.Joints.push(new EndPoint(sceneNode));
        }
    },
    extractSegments:function(t, item){

        if (item.SegmentType === "bezier"){
            var segment = new BezierSegment();

            var sceneNode = new SceneNode(this.SceneNode);
            sceneNode.translate(t, item.ControlPoint1.X, item.ControlPoint1.Y);

            var sceneNode2 = new SceneNode(this.SceneNode);
            sceneNode2.translate(t, item.ControlPoint2.X, item.ControlPoint2.Y);

            segment.setControlPoints(sceneNode, sceneNode2);

            this.Segments.push(segment);
        }
        else if (item.SegmentType === "line"){
            this.Segments.push(new LineSegment());
        }
    },
    loadFromObject:function(t, object){
        var item;

        var isJoint = true;
        this.Segments = new Array();
        this.Joints = new Array();
        this.Points = new Array();

        var thisObj = this;

        this.IsClosedPath = object.IsClosedPath;

        var index = 0;
        _.each(object.Items, function(item){
            if (isJoint){
                var isEndPoint = (index === 0 || index === (object.Items.length - 1));
                thisObj.extractJoints(t, item, isEndPoint);
            }
            else{
                thisObj.extractSegments(t, item);
            }
            isJoint = !isJoint;
            index++;
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
        return "PolySegmentShape " + this._super();
    }

});