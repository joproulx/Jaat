define([
    'libs/ctor/ctor',
    'transition/transition',
'common/TransformationMatrixHelper'],
    function (Ctor, Transition, TransformationMatrixHelper) {
        var TransformationMatrixLinearTransition = Ctor(Transition, function (_super) {
            this.init = function () {
                _super.init.call(this);
            };
            this.getValue = function (t) {
                if (t < this.StartTimestamp || t > this.EndTimestamp) {
                    throw "Invalid t";
                }

                var ratio = (t - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);
                var startRadians = TransformationMatrixHelper.getRotationRadian(this.StartValue);
                var endRadians = TransformationMatrixHelper.getRotationRadian(this.EndValue);
                var radians = ratio * (endRadians) + startRadians;
                var startTx = TransformationMatrixHelper.getTranslationX(this.StartValue);
                var startTy = TransformationMatrixHelper.getTranslationY(this.StartValue);
                var endTx = TransformationMatrixHelper.getTranslationX(this.EndValue);
                var endTy = TransformationMatrixHelper.getTranslationY(this.EndValue);
                var tx = ratio * (endTx - startTx) + startTx;
                var ty = ratio * (endTy - startTy) + startTy;
                return TransformationMatrixHelper.getTransformationMatrix(radians, tx, ty);
            };
        });
        return TransformationMatrixLinearTransition;
    });
