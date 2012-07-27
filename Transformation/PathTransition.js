
var PathTransition = Class.extend({
    init: function(path, sceneNode){
        this.SceneNode = sceneNode;
        this.Path = path;
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

        var point = this.Path.getPointFromRatio(timestamp, ratio);

        return getTransformationFromPoint(this.SceneNode.getParentTransformationMatrix(timestamp), point.X, point.Y);
    }
});
