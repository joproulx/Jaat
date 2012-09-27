
var FollowPathTransition = Class.extend({
    init: function(path, startRatio, endRatio, sceneNode){
        this.SceneNode = sceneNode;
        this.Path = path;



        this.StartRatio = startRatio;
        this.EndRatio = endRatio;

        this.StartTimestamp = null;
        this.EndTimestamp = null;
        this.StartValue = null;
        this.EndValue = null;
    },
    getValue: function(t){
        if (t < this.StartTimestamp || t > this.EndTimestamp){
            throw "FollowPathTransition.getValue: Invalid t";
        }

        var ratio = (t - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);
        var isZeroRatio = (ratio === 0);
        ratio = ((this.EndRatio - this.StartRatio) * ratio + this.StartRatio) % 1;

        if (ratio === 0 && !isZeroRatio){
            ratio = 1;
        }

        var point = this.Path.getPointFromRatio(t, ratio);

        var matrix = getTransformationFromPoint(this.SceneNode.getParentTransformationMatrix(t), point.X, point.Y);

        return new Point(getTranslationX(matrix), getTranslationY(matrix));



        var radians = this.Path.getTangentAngleFromRatio(t, ratio);
        var cosRadians = Math.cos(radians);
        var sinRadians = Math.sin(radians);

        return $M([
            [cosRadians, -sinRadians, matrix.e(1, 3)],
            [sinRadians, cosRadians, matrix.e(2, 3)],
            [0, 0, 1]
        ]);
    }
});
