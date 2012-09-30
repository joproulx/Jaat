define([
    'libs/ctor/ctor',
    'element/shape/PolySegmentShape'],
    function (Ctor, PolySegmentShape) {
        var RectangleShape = Ctor(PolySegmentShape, function (_super) {
            this.init = function (t, x, y, w, h) {
                this.X = x;
                this.Y = y;
                this.W = w;
                this.H = h;

                var points = [];
                points.push(new Point(x, y));
                points.push(new Point(x + w, y));
                points.push(new Point(x + w, y + h));
                points.push(new Point(x, y + h));

                _super.init.call(thist, points, false, true);
            };
        });
        return RectangleShape;
    });