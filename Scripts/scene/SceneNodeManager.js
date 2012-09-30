define(['libs/ctor/ctor'], function (Ctor) {
    var SceneNodeManager = Ctor(function () {
        this.init = function () {
            this.SceneNodes = [];
        };
        this.addSceneNode = function (sceneNode) {
            this.SceneNodes.push(sceneNode);
        };
    });

    return SceneNodeManager;
});