define([
    'libs/ctor/ctor',
    'element/shape/PolySegmentShape'],
    function (Ctor, PolySegmentShape) {
        var ArrowShape = Ctor(PolySegmentShape, function (_super) {
            this.init = function (t) {
                var path = {
                    IsClosedPath:true,
                    Origin:{X:0, Y:25},
                    Items:[
                        { X:0, Y:-25 },
                        { SegmentType:"line" },
                        { X:50, Y:0 },
                        { SegmentType:"line" },
                        { X:0, Y:25 },
                        { SegmentType:"line" }
                    ]};

                _super.init.call(thist, path);
            };
        });
        return ArrowShape;
    });
