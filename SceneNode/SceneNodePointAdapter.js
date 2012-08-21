// This class wraps a SceneNode and adapt it to act as a Point. The point represents the position
// of the SceneNode at the specified timestamp.
var SceneNodePointAdapter = TimedValue.extend({
    init:function (sceneNode) {
        this.SceneNode = sceneNode;
        this._super(null);
    },
    get:function (t) {
        return this.SceneNode.getPosition(t);
    },
    set:function (t, value) {
        return this.SceneNode.setPosition(t, value);
    }
});
