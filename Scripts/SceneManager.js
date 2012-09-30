define([
    'libs/ctor/ctor',
    'Scene',
    'TimeLineController'],
    function (Ctor, Scene, TimeLineController) {
        var SceneManager = Ctor(function () {
            this.init = function (startTimestamp, endTimestamp, context) {
                this.DefaultScene = "_DefaultScene_";
                this.m_scenes = {};
                this.createScene(this.DefaultScene);

                this.TimeLineController = new TimeLineController(startTimestamp, endTimestamp, context);
                this.TimeLineController.RenderEvent.subscribe(this.onRender, this);
            };
            this.createScene = function (name) {
                var scene = new Scene(name);
                this.m_scenes[name] = scene;
                return scene;
            };
            this.addToScene = function (sceneElement, sceneName) {
                var scene = this.getScene(sceneName);
                scene.addElement(sceneElement);
            };
            this.getScene = function (name) {
                if (name === undefined) {
                    name = this.DefaultScene;
                }
                if (!this.m_scenes.hasOwnProperty(name)) {
                    return this.createScene(name);
                }
                return this.m_scenes[name];
            };
            this.onRender = function (from, t, context) {
                from.renderScene.call(from, t, context);
            };
            this.renderScene = function (t, context) {
                for (var scene in this.m_scenes) {
                    if (this.m_scenes.hasOwnProperty(scene)) {
                        this.m_scenes[scene].render(t, context);
                    }
                }
            }
        });
        return SceneManager;
    });
