define([
    'libs/ctor/ctor',
    'transition/transition'],
    function (Ctor, Transition) {
        var LinearTransition = Ctor(Transition, function (_super) {
            this.init = function () {
                _super.init.call(this);
            };
            this.getValue = function (t) {
                if (t < this.StartTimestamp || t > this.EndTimestamp) {
                    throw "Invalid timestamp";
                }

                var ratio = (t - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);

                return (ratio * (this.EndValue - this.StartValue)) + this.StartValue;
            };
        });
        return LinearTransition;
    });

