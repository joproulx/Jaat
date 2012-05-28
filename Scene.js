var Scene = Class.extend({
    init: function (name) {
        this.SceneName = name;
        this.m_elements = new Array();
    },
    addElement: function(sceneElement){
        this.m_elements.push(sceneElement);
    },
    render: function(context, timestamp){
        for(var i = 0; i < this.m_elements.length; i++){
            this.m_elements[i].render(context, timestamp);
        }
    }
});

