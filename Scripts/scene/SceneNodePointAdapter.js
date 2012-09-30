define(['libs/ctor/ctor',
        'common/timedValue/TimedValue'], function (Ctor, TimedValue) {
    var SceneNodePointAdapter = Ctor(TimedValue, function (_super) {
        this.init = function (sceneNode) {
            this.SceneNode = sceneNode;
            _super.init(null);
        };
        this.get = function (t) {
            return this.SceneNode.getPosition(t);
        };
        this.set = function (t, value) {
            return this.SceneNode.setPosition(t, value);
        }
    });
    return SceneNodePointAdapter;
});