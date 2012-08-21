var SceneNode = Class.extend({
    init:function (parentNode) {
        this.ParentNode = parentNode;
        this.ChildNodes = new Array();
        this.m_transformationMatrix = new TimedValue(function() { return new TransformationMatrixLinearTransition(); });
        this.m_transformationMatrix.set(0, $M([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]));

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
        return this.getParentTransformationMatrix(t).x(this.m_transformationMatrix.get(t));
    },
    getPosition:function (t) {
        var matrix = this.getTransformationMatrix(t);
        return new Point(matrix.e(1, 3), matrix.e(2, 3));
    },
    setPosition:function (t, point) {
        // TODO: bug: if you call rotate before setPosition, the rotation is overriden
        var translationMatrix = getTransformationFromPoint(this.getParentTransformationMatrix(t), point.X, point.Y);
        this.m_transformationMatrix.set(t, translationMatrix);
    },
    setPath:function (t, path, startRatio, endRatio) {
        this.m_transformationMatrix.set(t, undefined, new PathTransition(path, startRatio, endRatio, this));
    },
    rotate:function(t, radian){
        var matrix = this.m_transformationMatrix.get(t);
        this.m_transformationMatrix.set(t, matrix.x(getRotationMatrix(radian)));
    },
    translate:function(t, dx, dy){
        var matrix = this.m_transformationMatrix.get(t);

        this.m_transformationMatrix.set(t, matrix.add($M([
            [0, 0, dx],
            [0, 0, dy],
            [0, 0, 0]])));
    }

});
