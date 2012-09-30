define(['libs/ctor/ctor'],
    function (Ctor) {
        var Scene = Ctor(function () {
            this.init = function (name) {
                this.SceneName = name;
                this.m_elements = [];
            };
            this.addElement = function (sceneElement) {
                this.m_elements.push(sceneElement);
            };
            this.render = function (t, context) {
                for (var i = 0; i < this.m_elements.length; i++) {
                    this.m_elements[i].render(t, context);
                }
            };
        });
        return Scene;
    });