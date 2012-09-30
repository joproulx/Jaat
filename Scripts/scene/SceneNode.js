define(['libs/ctor/ctor',
    'common/TransformationMatrixHelper',
    'common/timedValue/TimedValue',
    'common/timedValue/LinearTimedValue',
    'common/Point',
    'transition/FollowPathTransition',
    'transition/PointLinearTransition',
    'transition/FollowDirectionTransition'],
    function (Ctor,
              TransformationMatrixHelper,
              TimedValue,
              LinearTimedValue,
              Point,
              FollowPathTransition,
              PointLinearTransition,
              FollowDirectionTransition) {

    var SceneNode = Ctor(function () {
        var _relativePosition = undefined;
        var _relativeOrientation = undefined;
        
        this.init = function (parentNode) {
            this.ParentNode = parentNode;
            this.ChildNodes = [];

            _relativePosition = new TimedValue(function () { return new PointLinearTransition(); });
            _relativePosition.set(0, new Point(0, 0));
            _relativeOrientation = new LinearTimedValue(0);
        };
        this.addChildSceneNode = function (sceneNode) {
            this.ChildNodes.push(sceneNode);
        };
        this.getParentTransformationMatrix = function (t) {
            if (this.ParentNode === undefined) {
                return $M([
                    [1, 0, 0],
                    [0, 1, 0],
                    [0, 0, 1]
                ]);
            }
            return this.ParentNode.getTransformationMatrix(t);
        };
        this.getTransformationMatrix = function (t) {
            var relativePosition = _relativePosition.get(t);
            var relativeOrientation = _relativeOrientation.get(t);
            var transformationMatrix = TransformationMatrixHelper.getTransformationMatrix(relativeOrientation,
                relativePosition.X,
                relativePosition.Y);

            return this.getParentTransformationMatrix(t).x(transformationMatrix);
        };
        this.getPosition = function (t) {
            var matrix = this.getTransformationMatrix(t);
            return new Point(TransformationMatrixHelper.getTranslationX(matrix),
                             TransformationMatrixHelper.getTranslationY(matrix));
        };
        this.setPosition = function (t, point) {
            // Convert absolute point to relative point
            var translationMatrix = TransformationMatrixHelper.getTransformationFromPoint(this.getParentTransformationMatrix(t), point.X, point.Y);
            _relativePosition.set(t, new Point(TransformationMatrixHelper.getTranslationX(translationMatrix),
                                               TransformationMatrixHelper.getTranslationY(translationMatrix)));
        };
        this.followPathPosition = function (t, path, startRatio, endRatio) {
            _relativePosition.set(t, undefined, new FollowPathTransition(path, startRatio, endRatio, this));
        };
        this.followPathOrientation = function (t, path, startRatio, endRatio) {
            _relativeOrientation.set(t, undefined, new FollowDirectionTransition(path, startRatio, endRatio, this));
        };
        this.followPath = function (t, path, startRatio, endRatio) {
            this.followPathPosition(t, path, startRatio, endRatio);
            this.followPathOrientation(t, path, startRatio, endRatio);
        };
        this.rotate = function (t, radian) {
            _relativeOrientation.set(t, radian);
        };
        this.translate = function (t, dx, dy) {
            _relativePosition.set(t, new Point(dx, dy));
        };
    });

    return SceneNode;
});