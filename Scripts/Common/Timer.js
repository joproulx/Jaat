define(['libs/ctor/ctor',
        'common/polyfill'
], function (Ctor) {
    var Timer = Ctor(function () {
        var _from = null;
        var _callback = null;
        var _offset = 0;
        var _timerId = 0;
        var _isStarted = false;

        this.init = function (from, callback) {
            _from = from;
            _callback = callback;
        };
        this.start = function () {
            if (_timerId) {
                this.stop();
            }

            _offset = this.getTickCount();

            var thisObj = this;

            function render() {
                var tickCount = thisObj.getTickCount();

                var elapsedTime = tickCount - _offset;
                _offset = tickCount;

                _callback(_from, elapsedTime);
                _timerId = window.requestAnimationFrame(render);
            }
            _timerId = window.requestAnimationFrame(render);
            _isStarted = true;
        };
        this.stop = function () {
            _isStarted = false;
            window.cancelAnimationFrame(_timerId);
        };
        this.getTickCount = function () {
            return new Date().getTime();
        };
    });

    return Timer;
});