var SceneNode = Class.extend({
    init:function (parentNode) {
        this.ParentNode = parentNode;
        this.ChildNodes = new Array();
        this.m_transformationMatrix = new TimedValue(function() { return new TransformationMatrixLinearTransition(); });
        this.m_transformationMatrix.set($M([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]), 0);

    },
    addChildSceneNode:function (sceneNode) {
        this.ChildNodes.push(sceneNode);
    },
    getParentTransformationMatrix:function (timestamp) {
        if (this.ParentNode === undefined) {
            return $M([
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ]);
        }
        return this.ParentNode.getTransformationMatrix(timestamp);
    },
    getTransformationMatrix:function (timestamp) {
        return this.getParentTransformationMatrix(timestamp).x(this.m_transformationMatrix.get(timestamp));
    },
    getPosition:function (timestamp) {
        var matrix = this.getTransformationMatrix(timestamp);
        return new Point(matrix.e(1, 3), matrix.e(2, 3));
    },
    setPosition:function (point, timestamp) {
        this.m_transformationMatrix.set(getTransformationFromPoint(this.getParentTransformationMatrix(timestamp), point.X, point.Y), timestamp);
    },
    rotate:function(radian, timestamp){
        var matrix = this.m_transformationMatrix.get(timestamp);
        this.m_transformationMatrix.set(matrix.x(getRotationMatrix(radian)), timestamp);
    }

});
