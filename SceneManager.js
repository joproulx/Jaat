/**
 * Created by JetBrains WebStorm.
 * User: Jo
 * Date: 04/02/12
 * Time: 5:59 AM
 * To change this template use File | Settings | File Templates.
 */
var SceneManager = Class.extend({
    init : function (startTimestamp, endTimestamp, context) {
        this.DefaultScene = "_DefaultScene_";
        this.m_scenes = {};
        this.createScene(this.DefaultScene);

        this.TimeLineController = new TimeLineController(startTimestamp, endTimestamp, context);
        this.TimeLineController.RenderEvent.subscribe(this.onRender, this);
    },
    createScene: function(name){
        var scene = new Scene(name);
        this.m_scenes[name] = scene;
        return scene;
    },
    addToScene: function(sceneElement, sceneName){
        var scene = this.getScene(sceneName);
        scene.addElement(sceneElement);
    },
    getScene: function(name){
        if (name === undefined){
            name = this.DefaultScene;
        }
        if (!this.m_scenes.hasOwnProperty(name))
        {
            return this.createScene(name);
        }
        return this.m_scenes[name];
    },
    onRender: function(from, t, context){
        for (var scene in from.m_scenes){
            from.m_scenes[scene].render(t, context);
        }
    }
});

