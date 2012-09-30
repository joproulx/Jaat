define([
    'libs/ctor/ctor',
    'transition/transition'],
    function (Ctor, Transition) {
        var FollowPathTransition = Ctor(Transition, function (_super) {
            this.init = function (path, startRatio, endRatio, sceneNode) {
                this.SceneNode = sceneNode;
                this.Path = path;
                this.StartRatio = startRatio;
                this.EndRatio = endRatio;
                _super.init();
            };
            this.getValue = function (t) {
                if (t < this.StartTimestamp || t > this.EndTimestamp) {
                    throw "FollowPathTransition.getValue: Invalid t";
                }

                var ratio = (t - this.StartTimestamp) / (this.EndTimestamp - this.StartTimestamp);
                var isZeroRatio = (ratio === 0);
                ratio = ((this.EndRatio - this.StartRatio) * ratio + this.StartRatio) % 1;

                if (ratio === 0 && !isZeroRatio) {
                    ratio = 1;
                }

                var point = this.Path.getPointFromRatio(t, ratio);
                var matrix = getTransformationFromPoint(this.SceneNode.getParentTransformationMatrix(t), point.X, point.Y);
                return new Point(getTranslationX(matrix), getTranslationY(matrix));
            };
        });
        return FollowPathTransition;
    });
