define([
    'libs/ctor/ctor',
    'transition/transition'],
    function (Ctor, Transition) {
        var PointLinearTransition = Ctor(Transition, function (_super) {
            this.init = function () {
                _super.init();
            };
            this.getValue = function (t) {
                if (t < this.StartTimestamp || t > this.EndTimestamp) {
                    throw "Invalid t";
                }

                var ratio = (t - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);
                return new Point(((ratio * (this.EndValue.X - this.StartValue.X)) + this.StartValue.X),
                    ((ratio * (this.EndValue.Y - this.StartValue.Y)) + this.StartValue.Y));
            };
        });
        return PointLinearTransition;
    });

/**
 * Created with JetBrains WebStorm.
 * User: Jo
 * Date: 15/05/12
 * Time: 9:35 PM
 * To change this template use File | Settings | File Templates.
 */
