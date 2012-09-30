define([
    'libs/ctor/ctor',
    'transition/transition'],
    function (Ctor, Transition) {
        var ColorLinearTransition = Ctor(Transition, function (_super) {
            this.init = function () {
                _super.init.call(this);
            };
            this.getValue = function (t) {
                if (t < this.StartTimestamp || t > this.EndTimestamp) {
                    throw "Invalid timestamp";
                }

                var ratio = (t - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);
                var r = this.getColorFromRatio(ratio, this.StartValue.R, this.EndValue.R);
                var g = this.getColorFromRatio(ratio, this.StartValue.G, this.EndValue.G);
                var b = this.getColorFromRatio(ratio, this.StartValue.B, this.EndValue.B);

                return {
                    R:r,
                    G:g,
                    B:b
                };
            };
            this.getColorFromRatio = function (ratio, startValue, endValue) {
                return (ratio * (endValue - startValue)) + startValue
            };
        });
        return ColorLinearTransition;
    });
