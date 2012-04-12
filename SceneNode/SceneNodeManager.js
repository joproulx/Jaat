
var SceneNodeManager = Class.extend(
    {
        init: function()
        {
            this.SceneNodes = new Array();
        },
        addSceneNode :function(sceneNode)
        {
            this.SceneNodes.push(sceneNode);
        }
    });

