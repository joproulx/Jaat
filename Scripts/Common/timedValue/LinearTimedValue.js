define([
    'libs/ctor/ctor',
    'common/timedValue/TimedValue',
    'transition/LinearTransition'],
    function (Ctor, TimedValue, LinearTransition) {
        var LinearTimedValue = Ctor(TimedValue, function (_super) {
            this.init = function (defaultValue) {
                _super.init(function () {
                    return new LinearTransition();
                });

                if (arguments.length === 1) {
                    this.set(0, defaultValue);
                }
            };
        });

        return LinearTimedValue;
    });