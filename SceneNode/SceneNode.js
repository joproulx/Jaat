var SceneNode = Class.extend({
    init:function (parentNode) {
        this.ParentNode = parentNode;
        this.ChildNodes = new Array();
//        this.m_transformationMatrix = new TimedValue(function() { return new TransformationMatrixLinearTransition(); });
//        this.m_transformationMatrix.set(0, $M([
//            [1, 0, 0],
//            [0, 1, 0],
//            [0, 0, 1]
//        ]));

        this.m_relativePosition = new TimedValue(function() { return new PointLinearTransition(); });
        this.m_relativePosition.set(0, new Point(0, 0));

        this.m_relativeOrientation = new LinearTimedValue(0);
    },
    addChildSceneNode:function (sceneNode) {
        this.ChildNodes.push(sceneNode);
    },
    getParentTransformationMatrix:function (t) {
        if (this.ParentNode === undefined) {
            return $M([
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ]);
        }
        return this.ParentNode.getTransformationMatrix(t);
    },
    getTransformationMatrix:function (t) {
        var relativePosition = this.m_relativePosition.get(t);
        var relativeOrientation = this.m_relativeOrientation.get(t);
        var transformationMatrix = getTransformationMatrix(relativeOrientation,
                                                           relativePosition.X,
                                                           relativePosition.Y);

        return this.getParentTransformationMatrix(t).x(transformationMatrix);
    },
    getPosition:function (t) {
        var matrix = this.getTransformationMatrix(t);
        return new Point(getTranslationX(matrix), getTranslationY(matrix));
    },
    setPosition:function (t, point) {
        // Convert absolute point to relative point
        var translationMatrix = getTransformationFromPoint(this.getParentTransformationMatrix(t), point.X, point.Y);
        this.m_relativePosition.set(t, new Point(getTranslationX(translationMatrix), getTranslationY(translationMatrix)));
    },
    followPathPosition: function(t, path, startRatio, endRatio){
        this.m_relativePosition.set(t, undefined, new FollowPathTransition(path, startRatio, endRatio, this));
    },
    followPathOrientation: function(t, path, startRatio, endRatio){
        this.m_relativeOrientation.set(t, undefined, new FollowDirectionTransition(path, startRatio, endRatio, this));
    },
    followPath:function (t, path, startRatio, endRatio) {
        this.followPathPosition(t, path, startRatio, endRatio);
        this.followPathOrientation(t, path, startRatio, endRatio);
    },
    rotate:function(t, radian){
        //var matrix = this.m_transformationMatrix.get(t);
        //this.m_transformationMatrix.set(t, matrix.x(getRotationMatrix(radian)));

        this.m_relativeOrientation.set(t, radian);

    },
    translate:function(t, dx, dy){
//        var matrix = this.m_transformationMatrix.get(t);
//
//        this.m_transformationMatrix.set(t, matrix.add($M([
//            [0, 0, dx],
//            [0, 0, dy],
//            [0, 0, 0]])));

        this.m_relativePosition.set(t, new Point(dx, dy));
    }

});
