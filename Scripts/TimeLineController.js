define([
    'libs/ctor/ctor',
    'common/Timer',
    'common/Event'],
    function (Ctor, Timer, Event) {
        var TimeLineController = Ctor(function () {
            this.init = function (startTimestamp, endTimestamp, context) {
                this.Context = context;
                this.BeforeRenderEvent = new Event();
                this.RenderEvent = new Event();
                this.StartTimestamp = startTimestamp;
                this.EndTimestamp = endTimestamp;
                this.CurrentTime = 0;
                this.m_timer = new Timer(this, this.onTimeout);
                this.IsStarted = false;
            };
            this.start = function (startTime) {
                this.IsStarted = true;
                this.CurrentTime = startTime;
                this.m_timer.start();
            };
            this.stop = function () {
                this.IsStarted = false;
                this.m_timer.stop();
            };
            this.seek = function (t) {
                this.CurrentTime = t;

                if (!this.IsStarted) {
                    this.renderFrame(this.CurrentTime, this.Context);
                }
            };
            this.onTimeout = function (from, elapsedTime) {
                from.CurrentTime += elapsedTime;
                from.renderFrame(from.CurrentTime, from.Context);
            };
            this.renderFrame = function (t, context) {
                this.BeforeRenderEvent.trigger(t, context);
                this.RenderEvent.trigger(t, context);
            };
        });
        return TimeLineController;
    });