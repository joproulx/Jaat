
var TransformationMatrixLinearTransition = Class.extend({
    init: function(){
        this.StartTimestamp = null;
        this.EndTimestamp = null;
        this.StartValue = null;
        this.EndValue = null;
    },
    getValue: function(timestamp){
        if (timestamp < this.StartTimestamp || timestamp > this.EndTimestamp){
            throw "Invalid timestamp";
        }

        var ratio = (timestamp - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);

        var startRadians = getRotationRadian(this.StartValue);
        var endRadians = getRotationRadian(this.EndValue);

        var radians = ratio * (endRadians) + startRadians;

        var startTx = getTranslationX(this.StartValue);
        var startTy = getTranslationY(this.StartValue);
        var endTx = getTranslationX(this.EndValue);
        var endTy = getTranslationY(this.EndValue);

        var tx = ratio * (endTx - startTx) + startTx;
        var ty = ratio * (endTy - startTy) + startTy;

        return getTransformationMatrix(radians, tx, ty);
    }
});