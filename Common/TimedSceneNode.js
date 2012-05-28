var TimedSceneNode = TimedValue.extend(
    {
        init: function (parentSceneNode) {
            this.m_parentSceneNode = parentSceneNode;
        },
        get: function(timestamp)
        {
            var sceneNode = this._super(timestamp);
            return sceneNode.getPosition();
        },
        set: function(value, timestamp, transition)
        {

        }
    });
