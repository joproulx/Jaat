define(['libs/ctor/ctor',
    'common/Timer',
    'SceneManager',
    'TimeLineControl'],
    function (Ctor, Timer, SceneManager, TimeLineControl) {
        var SampleCanvas = Ctor(function () {
            this.Context = null;
            this.Canvas = null;
            this.BackgroundContext = null;
            this.BackgroundCanvas = null;

            var m_drawGrid = true;
            var m_sceneManager = null;
            var m_timeLineControl = null;

            this.init = function (name) {
                var getId = function(id){
                    return name + "_" + id;
                }
                $("body").append(
                    '<div id="' + getId('') + '" style="position:relative; width:800px; height:450px">\
                        <canvas id="layer1" style="z-index:1;position:absolute;left:0;top:0;" height="450px" width="800">\
                            HTML5 not supported in your browser.\
                        </canvas>\
                        <canvas id="layer2" style="z-index: 2;position:absolute;left:0;top:0;" height="450px" width="800">\
                            HTML5 not supported in your browser.\
                        </canvas>\
                        <canvas id="layer3" height="450px" width="800">\
                            HTML5 not supported in your browser.\
                        </canvas>\
                        <button type="button" id="'+getId("buttonName")+ '">Play</button>\
                        <button type="button" id="'+getId("buttonGrid")+ '">Grid</button>\
                    </div>');

                $("div#" + getId('') + " button#" + getId("buttonName")).click(this.onClickPlay);
                $("div#" + getId('') + " button#" + getId("buttonGrid")).click(this.onClickDisplayGrid);

                this.BackgroundCanvas = $('div#' + getId('') + ' canvas#layer1').get(0);
                this.BackgroundContext = this.BackgroundCanvas.getContext('2d');
                this.Canvas = $('div#' + getId('') + ' canvas#layer2').get(0);
                this.Context = this.Canvas.getContext('2d');

                m_sceneManager = new SceneManager(0, 20000, this.Context);

                m_timeLineControl = new TimeLineControl(m_sceneManager.TimeLineController, this.Canvas);

                m_sceneManager.TimeLineController.BeforeRenderEvent.subscribe(this.onBeforeRendered, this);
                //m_sceneManager.addToScene(polyLine);
                //m_sceneManager.addToScene(arrow);
                //m_sceneManager.addToScene(arrow2);

                this.drawGrid();
            };
            this.addToScene=function(elements){
                if (typeof elements !== "Array"){
                    elements = [elements];
                }

                for(var i = 0; i < elements.length; i++){
                    m_sceneManager.addToScene(elements[i]);
                }

                m_sceneManager.renderScene(0, this.Context);
            }
            this.drawGrid = function () {
                this.BackgroundContext.clearRect(0, 0, 800, 450);

                this.BackgroundContext.fillStyle = "#FAF7F8";
                this.BackgroundContext.beginPath();
                this.BackgroundContext.rect(0, 0, 800, 450);
                this.BackgroundContext.closePath();
                this.BackgroundContext.fill();

                if (m_drawGrid) {
                    var i;
                    for (i = 0; i < this.Canvas.height; i += 50) {

                        this.BackgroundContext.save();
                        this.BackgroundContext.strokeStyle = "gray";
                        this.BackgroundContext.lineWidth = 1;
                        this.BackgroundContext.moveTo(0.5, i + 0.5);
                        this.BackgroundContext.lineTo(this.Canvas.width + 0.5, i + 0.5);
                        this.BackgroundContext.stroke();
                        this.BackgroundContext.restore();
                    }

                    for (i = 0; i < this.Canvas.width; i += 50) {
                        this.BackgroundContext.save();
                        this.BackgroundContext.strokeStyle = "gray";
                        this.BackgroundContext.lineWidth = 1;
                        this.BackgroundContext.moveTo(i + 0.5, 0.5);
                        this.BackgroundContext.lineTo(i + 0.5, this.Canvas.height + 0.5);
                        this.BackgroundContext.stroke();
                        this.BackgroundContext.restore();
                    }
                }
            };
            this.onClickDisplayGrid = function () {
                m_drawGrid = !m_drawGrid;
                this.drawGrid();
            };
            this.onClickPlay = function () {
                if (m_sceneManager.TimeLineController.IsStarted) {
                    m_sceneManager.TimeLineController.stop();
                }
                else {
                    m_sceneManager.TimeLineController.start(m_sceneManager.TimeLineController.CurrentTime);
                }
            };
            this.onBeforeRendered = function (from, t, context) {
                //Clear Canvas
                context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
            };
        });
        return SampleCanvas;
    });