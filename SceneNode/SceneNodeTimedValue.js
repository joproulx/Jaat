var SceneNodeTimedValue = TimedValue.extend({
    init:function (sceneNode) {
        this.SceneNode = sceneNode;
        this._super(null);
    },
    get:function (timestamp) {
        return this.SceneNode.getPosition(timestamp);
    },
    set:function (value, timestamp) {
        return this.SceneNode.setPosition(value, timestamp);
    }
});
